import { ILoginParam, IRegisterParam } from "../interface/user.interface";
import prisma from "../lib/prisma";
import { hash, genSaltSync, compare } from "bcrypt";
import { sign ,verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { SECRET_KEY, REFRESH_SECRET } from "../config";

interface JwtPayload {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

async function GetAll() {
  try {
    return await prisma.user.findMany();
  } catch (err) {
    throw err;
  }
}

function generateReferralCode(firstName: string): string {
  const prefix = firstName.toLowerCase();
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const referralCode = `${prefix}${randomNumber}`;

  return referralCode.length > 20 ? referralCode.slice(0, 20) : referralCode;
}

const defaultProfilePicture = "https://www.w3schools.com/howto/img_avatar.png";

async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        profile_picture: true,
        password: true,
        role: true,
        referral_code: true,
      },
      where: {
        email,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}
async function RegisterService(param: IRegisterParam) {
  try {
    const isExist = await findUserByEmail(param.email);

    if (isExist) {
      return {
        status: false,
        code: 404,
        message: "Email sudah terdaftar",
      };
    }

    const result = await prisma.$transaction(async (tx) => {
      const { referral_code } = param;

      const salt = genSaltSync(10);

      const hashedPassword = await hash(param.password, salt);

      const referralCode = generateReferralCode(param.first_name).slice(0, 20);

      const user = await prisma.user.create({
        data: {
          first_name: param.first_name,
          last_name: param.last_name,
          email: param.email,
          password: hashedPassword,
          role: param.role,
          referral_code: referralCode,
          profile_picture: defaultProfilePicture,
          created_at: new Date(),
        },
      });

      if (referral_code) {
        const referrer = await tx.user.findFirst({
          where: { referral_code: referral_code },
        });
        if (referrer) {
          await tx.referral_log.create({
            data: {
              referrer_id: referrer.id,
              referred_user_id: user.id,
              created_at: new Date(),
            },
          });

          await tx.coupon.create({
            data: {
              created_by_id : user.id,
              is_active : true,
              max_usage : 1,
              code : "REGCOUPON",
              discount_amount: 10,
              expired_at: new Date(
                new Date().setMonth(new Date().getMonth() + 3)
              ), // expired 3 bulan
              created_at: new Date(),
              updated_at : new Date(),
            },
          });

          await tx.point.create({
            data: {
              user_id: referrer.id,
              point: 10000,
              expired_at: new Date(
                new Date().setMonth(new Date().getMonth() + 3)
              ), // expired 3 bulan
              created_at: new Date(),
            },
          });
        }
      }

      return user;
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function LoginService(param: ILoginParam) {
  try {
    const user = await findUserByEmail(param.email);

    if (!user) {
      return {
        status: false,
        code: 404,
        message: "Email belum terdaftar",
      };
    }

    const checkPass = await compare(param.password, user.password);

    if (!checkPass) {
      return {
        status: false,
        code: 404,
        message: "Password salah",
      };
    }

    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      referral_code: user,
    };

    const token = sign(payload, String(SECRET_KEY), { expiresIn: "1h" });
    const refreshToken = sign(payload, String(REFRESH_SECRET), { expiresIn: "7d" });

    const data = {
      id : user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      profile_picture: user.profile_picture,
      referral_code: user.referral_code,
    };
    return { user: data, token, refreshToken };
  } catch (err) {
    throw err;
  }
}

async function RefreshToken(req : Request, res : Response ){
  const token = req.cookies.refresh_token;
  const cookie = req.cookies;
  if (!token) return res.status(401).json({ message: "No token provided", cookie });

  try {
    const payload = verify(token, String(REFRESH_SECRET)) as JwtPayload;

    const newAccessToken = sign(
      {
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        role: payload.role,
      },
      String(SECRET_KEY),
      { expiresIn: "1h" }
    );

    return { newAccessToken };
  } catch (err) {
    return token;
  }
}

export { RegisterService, LoginService, GetAll, RefreshToken };

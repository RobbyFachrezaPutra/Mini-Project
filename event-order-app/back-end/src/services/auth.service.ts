import { ILoginParam, IRegisterParam } from "../interface/user.interface";
import prisma from "../lib/prisma";
import { hash, genSaltSync, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { SECRET_KEY } from "../config";

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
        email: true,
        first_name: true,
        last_name: true,
        password: true,
        role: true,
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

    if (isExist) throw new Error("Email sudah terdaftar");

    const result = await prisma.$transaction(async (prisma) => {
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

    if (!user) throw new Error("Email sudah terdaftar");

    const checkPass = await compare(param.password, user.password);

    if (!checkPass) throw new Error("Password Salah");

    const payload = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };

    const token = sign(payload, String(SECRET_KEY), { expiresIn: "1h" });

    return { user: payload, token };
  } catch (err) {
    throw err;
  }
}

export { RegisterService, LoginService };

import { Request, Response, NextFunction } from "express";
import {
  LoginService,
  RegisterService,
  GetAll,
  RefreshToken,
} from "../services/auth.service";

import { IUserReqParam } from "../custom";

async function RegisterController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await RegisterService(req.body);

    res.status(200).send({
      message: "Register Berhasil",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function LoginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await LoginService(req.body);

    if (data.status === false) {
      res.status(data.code).send({
        message: data.message,
        data: null,
      });
      return;
    }

    res
      .status(200)
      .cookie("access_token", data.token, {
        httpOnly: true, // Lebih aman
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("refresh_token", data.refreshToken, {
        httpOnly: true, // Lebih aman
        secure: true,
        sameSite: "none",
        path: "/",
      })
      .send({
        message: "Login Berhasil",
        data: data.user,
        token: data.token, // Kirim token dalam response body juga
      });
  } catch (err) {
    next(err);
  }
}

async function UserController(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as IUserReqParam;
    console.log(user);
    const data = await GetAll();

    res.status(200).send({
      message: "Berhasil",
      data: data,
    });
  } catch (err) {
    next();
  }
}

async function RefreshTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await RefreshToken(req, res);
    const accessToken = result.newAccessToken;

    res
      .status(200)
      .cookie("access_token", accessToken, {
        httpOnly: true, // Lebih aman
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .send({
        message: "Refresh token berhasil",
        token: accessToken, // Kirim token dalam response body juga
      });
  } catch (err) {
    next(err);
  }
}

export {
  RegisterController,
  LoginController,
  UserController,
  RefreshTokenController,
};

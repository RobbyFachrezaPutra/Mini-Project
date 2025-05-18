import { Request, Response, NextFunction } from "express";
import {
  LoginService,
  RegisterService,
  GetAll,
  RefreshToken
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

    res.status(200).
    cookie("access_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // hanya aktif di production (misal di Vercel)
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).
    cookie("refresh_token", data.refreshToken, {
      httpOnly: true,
      secure: true, // cookie only over HTTPS in prod
      sameSite: "none", // or "none" for cross-site, but "none" requires HTTPS
      path: "/",
    }).
    send({
      message: "Login Berhasil",
      data: data.user,
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

async function RefreshTokenController(req: Request, res: Response, next: NextFunction) {
  try{
     const accessToken = await RefreshToken(req, res);

    res.status(200).    cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).
    send({
      message: "Refresh token berhasil"
    });
  } catch (err)
  {
    next();
  }
}


export { RegisterController, LoginController, UserController, RefreshTokenController };

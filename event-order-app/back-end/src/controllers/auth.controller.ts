import { Request, Response, NextFunction } from "express";
import {
  LoginService,
  RegisterService,
  GetAll,
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

    res
      .status(200)
      .cookie("acces_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .send({
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

export { RegisterController, LoginController, UserController };

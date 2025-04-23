import { Request, Response, NextFunction } from "express";
import { LoginService, RegisterService } from "../services/auth.service";

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

    res.status(200).cookie("acces_token", data.token).send({
      message: "Login Berhasil",
      data: data.user,
    });
  } catch (err) {
    next(err);
  }
}

export { RegisterController, LoginController };

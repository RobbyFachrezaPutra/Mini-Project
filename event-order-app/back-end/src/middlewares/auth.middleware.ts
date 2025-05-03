import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IUserReqParam } from "../custom";
import { SECRET_KEY } from "../config";

async function VerifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new Error("Unauthorized");

    const verifyUser = verify(token, String(SECRET_KEY));

    if (!verifyUser) throw new Error("Token tidak valid");

    req.user = verifyUser as IUserReqParam;

    next();
  } catch (err) {
    next(err);
  }
}

async function requireEventOrganizerRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.status(401).json({
      message: "Access Unauthorized",
      details: "You must be an event organizer to access this resource",
    });
    return;
  } catch (err) {
    next(err);
  }
}

async function requireAdminRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "admin") {
    res.status(401).json({
      message: "Access Unauthorized",
      details: "You must be an admin to access this resource",
    });
    return;
  }

  next();
}

export { VerifyToken, requireEventOrganizerRole, requireAdminRole };

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IUserReqParam } from "../custom";
import { SECRET_KEY } from "../config";

async function VerifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.access_token;
    if (!token) {     
      res.status(401).json({
      message: "Access Unauthorized",
      details: "You must login to access this resource",
      });
      return;
    };

    const verifyUser = verify(token, String(SECRET_KEY));

    if (!verifyUser) {
      res.status(401).json({
      message: "Token invalid",
      details: "You must login to access this resource",
      });
      return;
    }

    req.user = verifyUser as IUserReqParam;

    next();
  } catch (err : unknown)  {
    if (err instanceof Error && err.name === 'TokenExpiredError') {
      res.status(401).json({
        message: 'Token expired',
        details: 'Your session has expired. Please login again.',
      });
      return;
    }
  
    if (err instanceof Error) {
      res.status(401).json({
        message: 'Token invalid',
        details: err.message || 'Authentication failed',
      });
      return;
    }
  
    // fallback jika err bukan Error
    res.status(500).json({
      message: 'Unexpected error',
      details: 'An unknown error occurred.',
    });
    return;
  }
}

async function requireEventOrganizerRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
    if (req.user?.role !== "event_organizer") {
    res.status(401).json({
      message: "Access Unauthorized",
      details: "You must be an event organizer to access this resource",
    });
    return;
  }
  next();
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

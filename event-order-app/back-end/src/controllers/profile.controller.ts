import { Request, Response, NextFunction } from "express";
import {
  getProfileService,
  editProfileService,
} from "../services/profile.service";
import { promises } from "dns";

async function ProfileController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userEmail = req.user?.email; // Mengambil email dari req.user
    if (!userEmail) {
      res.status(400).send({ message: "User  email not found" });
      return;
    }

    const data = await getProfileService(userEmail);

    res.status(200).send({
      message: "Berhasil ambil data profile",
      data,
    });
    return;
  } catch (err) {
    next(err); // error dilempar ke global handler
  }
}

async function editProfileController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userEmail = req.user?.email;

    if (!userEmail) {
      res.status(400).send({ message: "User email not found" });
      return;
    }

    const file = req.file;
    const data = await editProfileService(userEmail, req.body, file);

    res.status(200).send({
      message: "Profile updated successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { ProfileController, editProfileController };

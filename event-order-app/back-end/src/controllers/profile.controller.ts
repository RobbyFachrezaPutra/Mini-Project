import { Request, Response, NextFunction } from "express";
import {
  getProfileService,
  updateProfileService,
  deleteProfilePictureService,
} from "../services/profile.service";

async function ProfileController(
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

    const data = await getProfileService(userEmail);
    res.status(200).send({
      message: "Berhasil ambil data profile",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function updateProfileController(
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

    const data = await updateProfileService(userEmail, req.body, req.file);

    res.status(200).send({
      message: req.file
        ? "Foto profil berhasil diupdate"
        : "Profil berhasil diupdate",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteProfilePictureController(
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

    const data = await deleteProfilePictureService(userEmail);
    res.status(200).send({
      message: "Foto profil berhasil dihapus",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export {
  ProfileController,
  updateProfileController,
  deleteProfilePictureController,
};

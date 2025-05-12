import { Router } from "express";
import {
  ProfileController,
  updateProfileController,
  deleteProfilePictureController,
} from "../controllers/profile.controller";
import { uploadSingle } from "../middlewares/upload.middleware";
import { VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/user-profile", VerifyToken, ProfileController);
router.patch(
  "/update-profile",
  VerifyToken,
  uploadSingle("profile_picture"),
  updateProfileController
);
router.delete(
  "/delete-profile-picture",
  VerifyToken,
  deleteProfilePictureController
);

export default router;

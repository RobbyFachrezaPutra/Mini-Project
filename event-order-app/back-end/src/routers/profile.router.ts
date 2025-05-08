import { Router } from "express";
import {
  ProfileController,
  editProfileController,
} from "../controllers/profile.controller";
import { uploadSingle } from "../middlewares/upload.middleware";

import { VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/user-profile", VerifyToken, ProfileController);
router.patch(
  "/edit-profile",
  VerifyToken,
  uploadSingle("profile_picture"),
  editProfileController
);

export default router;

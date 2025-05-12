import { Request, Response, NextFunction } from "express";
import { resetPasswordService } from "../services/reset-password";

// Di controller
export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Tambahkan validasi
    if (!req.user?.id) {
      res.status(401).json({ message: "User ID tidak valid" });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    const result = await resetPasswordService(
      req.user.id, // ← Sekarang aman karena sudah divalidasi
      currentPassword,
      newPassword
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

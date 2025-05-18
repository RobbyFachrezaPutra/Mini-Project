import { Request, Response } from "express";
import {
  sendResetLinkWithToken,
  resetPasswordWithToken,
} from "../services/forgot-password.service";

// Controller untuk mengirim email reset password
export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email diperlukan" });
      return;
    }

    const result = await sendResetLinkWithToken(email);

    // Mengembalikan URL preview Ethereal untuk testing
    res.status(200).json({
      message: result.message,
      previewUrl: result.previewUrl,
    });
    return;
  } catch (error: any) {
    console.error("Error in forgotPasswordController:", error);

    if (error.message === "User tidak ditemukan") {
      res.status(404).json({ message: "Email tidak terdaftar" });
      return;
    }

    res.status(500).json({ message: "Gagal mengirim email reset password" });
    return;
  }
};

// Controller untuk reset password dengan token
export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      res.status(400).json({ message: "Token dan password diperlukan" });
      return;
    }

    const result = await resetPasswordWithToken(token, password);
    res.status(200).json(result);
    return;
  } catch (error: any) {
    console.error("Error in resetPasswordController:", error);

    if (error.message === "Token tidak valid atau sudah kadaluarsa") {
      res.status(400).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Gagal mengubah password" });
    return;
  }
};

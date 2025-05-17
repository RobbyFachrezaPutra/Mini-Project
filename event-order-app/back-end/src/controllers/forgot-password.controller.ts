import { Request, Response } from "express";
import { sendResetLinkWithoutToken } from "../services/forgot-password.service";

/**
 * Controller untuk mengirim email reset password (tanpa token, MVP version).
 * Expects: { email } di body request.
 */
export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const result = await sendResetLinkWithoutToken(email);

    res.status(200).json(result);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal server error" });
    return;
  }
};

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import prisma from "../lib/prisma";

// Service untuk mengirim email reset password
export const sendResetLinkWithToken = async (email: string) => {
  // Cek apakah user ada
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User tidak ditemukan");

  // Generate token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "secret-key",
    { expiresIn: "1h" }
  );

  // Buat akun Ethereal untuk testing
  const testAccount = await nodemailer.createTestAccount();
  console.log("Ethereal account created:", testAccount);

  // Setup email transporter dengan Ethereal
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // Link reset password
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const resetLink = `${frontendUrl}/new-password?token=${token}`;

  // Kirim email
  const info = await transporter.sendMail({
    from: '"Tiketin.com" <noreply@tiketin.com>',
    to: email,
    subject: "Reset Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Password</h2>
        <p>Anda menerima email ini karena Anda meminta reset password untuk akun Anda.</p>
        <p>Klik tombol di bawah untuk melanjutkan proses reset password (berlaku 1 jam):</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
      </div>
    `,
  });

  // Log URL preview Ethereal untuk melihat email
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return {
    message: "Link reset password telah dikirim ke email Anda",
    previewUrl: nodemailer.getTestMessageUrl(info), // Mengembalikan URL preview untuk testing
  };
};

// Service untuk reset password dengan token
export const resetPasswordWithToken = async (
  token: string,
  newPassword: string
) => {
  try {
    // Verifikasi token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret-key"
    ) as { userId: string };

    // Hash password baru
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password user
    await prisma.user.update({
      where: { id: Number(decoded.userId) },
      data: { password: hashedPassword },
    });

    return { message: "Password berhasil diubah" };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Token tidak valid atau sudah kadaluarsa");
    }
    throw error;
  }
};

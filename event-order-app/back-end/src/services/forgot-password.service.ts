import nodemailer from "nodemailer";
import prisma from "../lib/prisma";

export const sendResetLinkWithoutToken = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User tidak ditemukan");

  const resetLink = `https://yourfrontend.com/reset-password`;

  const transporter = nodemailer.createTransport({
    // pakai Ethereal/Gmail (bisa disesuaikan)
  });

  await transporter.sendMail({
    from: '"MVP App 👻" <noreply@mvp.com>',
    to: email,
    subject: "Reset Password",
    html: `<p>Klik link berikut untuk reset password: <a href="${resetLink}">Reset Password</a></p>`,
  });

  return { message: "Link reset password telah dikirim" };
};

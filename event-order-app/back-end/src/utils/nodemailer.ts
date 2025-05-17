import nodemailer from "nodemailer";

/**
 * Membuat transporter Nodemailer menggunakan akun Ethereal (untuk testing).
 * Fungsi ini async karena createTestAccount dan createTransport async.
 */
export async function createEtherealTransporter() {
  // Membuat akun Ethereal baru
  const testAccount = await nodemailer.createTestAccount();

  // Membuat transporter dengan credential Ethereal
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true untuk port 465, false untuk 587
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return { transporter, testAccount };
}

import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

// Fungsi inisialisasi transporter sekali saja
export async function initEtherealTransporter() {
  if (transporter) return transporter; // kalau sudah ada, pakai yang lama

  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log("Ethereal account user:", testAccount.user);
  return transporter;
}

// Fungsi untuk akses transporter yang sudah di-init
export function getTransporter() {
  if (!transporter)
    throw new Error(
      "Transporter belum diinisialisasi. Panggil initEtherealTransporter dulu."
    );
  return transporter;
}

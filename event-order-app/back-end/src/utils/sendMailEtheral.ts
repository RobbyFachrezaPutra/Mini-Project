import { getTransporter, initEtherealTransporter } from "./nodemailer";

export async function sendMailEthereal(
  to: string,
  subject: string,
  html: string
) {
  await initEtherealTransporter();
  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from: '"Event Order App" <no-reply@eventorder.com>',
    to,
    subject,
    html,
  });

  const previewUrl = require("nodemailer").getTestMessageUrl(info);

  // 🔥 Tambahin log ini biar pasti keliatan
  console.log("📬 EMAIL PREVIEW URL:", previewUrl);

  return previewUrl;
}

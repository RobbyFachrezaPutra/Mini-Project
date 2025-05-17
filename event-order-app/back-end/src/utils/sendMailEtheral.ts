import { createEtherealTransporter } from "./nodemailer";

export async function sendMailEthereal(
  to: string,
  subject: string,
  html: string
) {
  const { transporter } = await createEtherealTransporter();

  const info = await transporter.sendMail({
    from: '"Event Order App" <no-reply@eventorder.com>',
    to,
    subject,
    html,
  });

  // Return preview URL untuk dicek di browser
  return require("nodemailer").getTestMessageUrl(info);
}

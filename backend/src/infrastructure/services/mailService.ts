import nodemailer, { Transporter } from "nodemailer";

const DEFAULT_MAIL_HOST = "smtp.mailtrap.io";
const DEFAULT_MAIL_PORT = 2525;

let transporter: Transporter | null = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const host = process.env.MAILTRAP_HOST || DEFAULT_MAIL_HOST;
  const port = Number(process.env.MAILTRAP_PORT ?? DEFAULT_MAIL_PORT);
  const user = process.env.MAILTRAP_USER;
  const pass = process.env.MAILTRAP_PASS;

  if (!user || !pass) {
    throw new Error(
      "Mail credentials missing. Please set MAILTRAP_USER and MAILTRAP_PASS in .env"
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  });

  return transporter;
};

export const sendOtpMail = async (email: string, otp: string) => {
  const smtpTransport = getTransporter();

  await smtpTransport.sendMail({
    from: process.env.MAIL_FROM || '"StudyStream" <no-reply@studystream.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
    html: `<p>Your OTP code is <strong>${otp}</strong></p>`
  });
};


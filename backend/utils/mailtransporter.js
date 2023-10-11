import nodemailer from "nodemailer";

const details = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.MAIL_APP_USER,
    pass: process.env.MAIL_APP_PASS,
  },
};

export const mailTransporter = nodemailer.createTransport(details);

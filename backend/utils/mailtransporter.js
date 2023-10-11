/**
 * Util that sets up the nodemailer
 * Specifies the details needed for the connection
 * exports the transporter
 *
 * to use: import mailTransporter where needed
 * to send mail: mailTransporter.sendMail(message, callback(err,info)*)
 *   *callback is optional, if omitted a Promise is returned instead
 *
 * message format: {
 * from: "filmvisarna.grupp1@gmail.com",
 * to: guestemail/useremail,
 * subject: "eg. Booking details",
 * text: "Plain text version of message",
 * html: "<p>HTML version of message</p>"}
 */

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

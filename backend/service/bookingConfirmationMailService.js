import { mailTransporter } from "../utils/mailtransporter.js";

export async function bookingConfirmationMailService(
  email,
  title,
  screeningDate,
  seats,
  bookingNumber
) {
  const textBody = `
Hej!

Här kommer bekräftelsen på din bokning.
Du har bokat
${title},
Den: ${screeningDate}
Platser: ${seats},
Bokningsnummer: ${bookingNumber}

Med Vänlig hälsning
Filmvisarna
`;

  const msg = {
    from: "filmvisarna.grupp1@gmail.com",
    to: email,
    subject: "Här är din bokning",
    text: textBody,
    html: "<p>HTML version of message</p>",
  };

  return mailTransporter.sendMail(msg);
}

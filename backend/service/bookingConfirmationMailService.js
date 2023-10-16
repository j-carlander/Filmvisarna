import { formatDateTimeSwe } from "../utils/formatDateTime.js";
import { formatSeatInfo } from "../utils/formatSeatsInfoForEmail.js";
import { mailTransporter } from "../utils/mailtransporter.js";

export async function bookingConfirmationMailService(
  email,
  title,
  screeningDate,
  seats,
  bookingNumber
) {
  const msg = {
    from: "filmvisarna.grupp1@gmail.com",
    to: email,
    subject: "Här är din bokning",
    text: textBody(title, screeningDate, seats, bookingNumber),
  };

  return mailTransporter.sendMail(msg);
}

function textBody(title, screeningDate, seats, bookingNumber) {
  return `
Hej!

Tack för din bokning!
Du har bokat
${title},
${formatDateTimeSwe(screeningDate)}
Platser: ${formatSeatInfo(seats)},
Bokningsnummer: ${bookingNumber}

För att avboka dina biljetter, gå in på http://www.filmvisarna.se/avboka

Med Vänlig Hälsning
Filmvisarna
`;
}

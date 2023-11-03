import { formatDateTimeSwe } from "../utils/formatDateTime.js";
import { formatSeatInfo } from "../utils/formatSeatsInfoForEmail.js";
import { mailTransporter } from "../utils/mailtransporter.js";

export async function bookingConfirmationMailService(
  email,
  title,
  screeningDate,
  seats,
  bookingNumber,
  cost
) {
  const msg = {
    from: "filmvisarna.grupp1@gmail.com",
    to: email,
    subject: "Här är din bokning",
    text: textBody(title, screeningDate, seats, bookingNumber, cost, email),
  };

  return mailTransporter.sendMail(msg);
}

function textBody(title, screeningDate, seats, bookingNumber, cost, email) {
  return `
Hej!

Tack för din bokning!
Du har bokat
${title},
${formatDateTimeSwe(screeningDate)}
Platser: ${formatSeatInfo(seats)},
Bokningsnummer: ${bookingNumber},
Att betala: ${cost}

För att avboka dina biljetter, gå in på http://localhost:5173/cancel?bookingNumber=${bookingNumber}&email=${email}

Med Vänlig Hälsning
Filmvisarna
`;
}

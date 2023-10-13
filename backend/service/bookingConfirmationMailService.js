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
    html: htmlBody(title, screeningDate, seats, bookingNumber),
  };

  return mailTransporter.sendMail(msg);
}

function textBody(title, screeningDate, seats, bookingNumber) {
  return `
Hej!

Tack för din bokning!
Du har bokat
${title},
Den: ${screeningDate}
Platser: ${formatSeatInfo(seats)},
Bokningsnummer: ${bookingNumber}

För att avboka dina biljetter, gå in på http://www.filmvisarna.se/avboka

Med Vänlig Hälsning
Filmvisarna
`;
}

function htmlBody(title, screeningDate, seats, bookingNumber) {
  const wrapperStyle = `width: 100dvw; height: 110dvh; display: grid; place-items: center; font-family: Montserrat, sans-serif; background-color: #041F1E; color: #F7DBA7`;
  const greetingStyle = `font-size: 22px;`;
  const titleStyle = `font-size: 32px;`;
  const pStyle = `font-size: 16px; font-weight: bold;`;
  const spanStyle = `font-weight: normal`;
  const btnStyle = `padding: 1em 2em; font-weight: semibold; border-radius: 50%; background-color: #837771; color: #EDEDED;`;

  return `<div style={${wrapperStyle}}>
    <p style={${greetingStyle}}>Hej!</p>
    <h1 style={${titleStyle}}>Tack för din bokning!</h1>
    <p style={${pStyle}}>Du har bokat</p>
    <p style={${greetingStyle}>${title}</p>
    <p style={${pStyle}}>
      Den: <span style={${spanStyle}}>${screeningDate}</span>
    </p>
    <p style={${pStyle}}>
      Platser: <span style={${spanStyle}}>${formatSeatInfo(seats)}</span>
    </p>
    <p style={${pStyle}}>
      Bokningsnummer: <span style={${spanStyle}}>${bookingNumber}</span>
    </p>
    <a href="http://www.filmvisarna.se/avboka" style={${btnStyle}}>
      Avboka
    </a>
    <p style={${pStyle}}>Med Vänlig Hälsning</p>
    <p style={${greetingStyle}}>Filmvisarna</p>
  </div>`;
}

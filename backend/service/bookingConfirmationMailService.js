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
    text: textBody(title, screeningDate, seats, bookingNumber, cost),
    html: htmlBody(title, screeningDate, seats, bookingNumber, cost),
  };

  return mailTransporter.sendMail(msg);
}

function textBody(title, screeningDate, seats, bookingNumber, cost) {
  return `
Hej!

Tack för din bokning!
Du har bokat
${title},
${formatDateTimeSwe(screeningDate)}
Platser: ${formatSeatInfo(seats)},
Bokningsnummer: ${bookingNumber},
Att betala: ${cost}

För att avboka dina biljetter, gå in på http://www.filmvisarna.se/avboka

Med Vänlig Hälsning
Filmvisarna
`;
}

// html: htmlBody(title, screeningDate, seats, bookingNumber),

function htmlBody(title, screeningDate, seats, bookingNumber, cost) {
  const wrapperStyle = `width: 100%; max-width: 800px; height: 100%; font-family: Montserrat, sans-serif; background-color: #041F1E; color: #F7DBA7;`;
  const innerWrapperStyle = `width: 50%; min-width:280px; margin: 5em auto; padding: 5em; font-family: Montserrat, sans-serif; background-color: #1E2D2F; color: #F7DBA7;`;
  const greetingStyle = `font-size: 22px;`;
  const titleStyle = `font-size: 32px;`;
  const pStyle = `font-size: 16px; font-weight: bold;`;
  const spanStyle = `font-weight: normal`;
  const btnStyle = `padding: 1em 2em; font-weight: semibold; border-radius: 1000px; background-color: #837771; color: #EDEDED;`;

  return `<body style="${wrapperStyle}">
    <article style="${innerWrapperStyle}">
      <p style="${greetingStyle}">Hej!</p>
      <h1 style="${titleStyle}">Tack för din bokning!</h1>
      <p style="${pStyle}">Du har bokat</p>
      <p style="${greetingStyle}">${title}</p>
      <p style="font-size: 16px; font-weight: bold;">
        Den: <span style="${spanStyle}">${screeningDate}</span>
      </p>
      <p style="${pStyle}">
        Platser: <span style="${spanStyle}">${formatSeatInfo(seats)}</span>
      </p>
      <p style="${pStyle}">
        Bokningsnummer: <span style="${spanStyle}">${bookingNumber}</span>
      </p>
      <p style="${pStyle}">
      Att betala: <span style="${spanStyle}">${cost}</span>
      </p>
      <a href="http://www.filmvisarna.se/avboka" style="${btnStyle}">
        Avboka
      </a>
      <p style="${pStyle}">Med Vänlig Hälsning</p>
      <p style="${greetingStyle}">Filmvisarna</p>
      </article>
    </body>`;
}

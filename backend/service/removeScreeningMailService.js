import { formatDateTimeSwe } from "../utils/formatDateTime.js";
import { mailTransporter } from "../utils/mailtransporter.js";

export async function removeScreeningMailService(email, title, screeningDate) {
  const msg = {
    from: "filmvisarna.grupp1@gmail.com",
    to: email,
    subject: `Visningen av ${title}, ${formatDateTimeSwe(
      screeningDate
    )} har tyvärr ställts in`,
    text: cancelScreeningTextMessage(title, screeningDate),
    html: cancelScreeningHtmlMessage(title, screeningDate),
  };

  return mailTransporter.sendMail(msg);
}

function cancelScreeningTextMessage(title, date) {
  return `
  Hej!
  
  Tyvärr måste vi meddela att visningen av 
  
  ${title}, 
  ${formatDateTimeSwe(date)} 
  
  har blivit inställd på grund av oförutsedda omständigheter. 
  Vi beklagar detta.
  
  Om du har några frågor eller om det är något annat vi kan assistera med, tveka inte att kontakta oss.
  
  Tack för din förståelse.
  
  Med vänliga hälsningar,
  Filmvisarna`;
}

function cancelScreeningHtmlMessage(title, screeningDate) {
  const wrapperStyle = `width: 100%; max-width: 800px; height: 100%; padding: 5em; font-family: Montserrat, sans-serif; background-color: #041F1E; color: #F7DBA7;`;
  const innerWrapperStyle = `width: 50%; min-width:280px; margin: 5em auto; padding: 5em; font-family: Montserrat, sans-serif; background-color: #1E2D2F; color: #F7DBA7;`;
  const greetingStyle = `font-size: 22px;`;
  const pStyle = `font-size: 16px; font-weight: bold;`;

  return `<body style="${wrapperStyle}">
      <article style="${innerWrapperStyle}">
        <p style="${greetingStyle}">Hej!</p>
        <p style="${pStyle}">Tyvärr måste vi meddela att visningen av</p>
        <p style="${greetingStyle}">${title}</p>
        <p style="font-size: 16px; font-weight: bold;">${formatDateTimeSwe(
          screeningDate
        )}</p>
        <p style="${pStyle}">har blivit inställd på grund av oförutsedda omständigheter.</p>
        <p style="${pStyle}">Vi beklagar detta.</p>
        <p style="${pStyle}">Om du har några frågor eller om det är något annat vi kan assistera med, tveka inte att kontakta oss.</p>
        <p style="${pStyle}">Tack för din förståelse!</p>
        <p style="${pStyle}">Med Vänlig Hälsning</p>
        <p style="${greetingStyle}">Filmvisarna</p>
        </article>
      </body>`;
}

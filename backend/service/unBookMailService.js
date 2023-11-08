import { mailTransporter } from "../utils/mailtransporter.js";

export async function unBookMailService(email) {
    const msg = {
        from: "filmvisarna.grupp1@gmail.com",
        to: email,
        subject: "Lyckad avbokning",
        text: textBody()
    };

    return mailTransporter.sendMail(msg);
}

function textBody() {
    return `
    Hej! Din avbokning är bekräftad!
    `
}
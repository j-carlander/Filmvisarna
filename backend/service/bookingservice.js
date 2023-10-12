import { runQuery } from "../db.js";

export async function bookingservice(
  bookingNumber,
  screeningid,
  guestemail,
  guestphone
) {
  const query =
    "INSERT INTO bookings(bookedat, bookingNumber, screeningid, guestemail, guestphone) VALUES(?, ?, ?, ?, ?)";

  const currentDate = new Date();
  return await runQuery(query, [
    currentDate.toLocaleString(),
    bookingNumber,
    screeningid,
    guestemail,
    guestphone,
  ]);
}

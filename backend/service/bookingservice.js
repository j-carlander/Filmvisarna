import { runQuery } from "../db.js";

export function bookingservice(
  bookingNumber,
  screeningid,
  guestemail,
  guestphone
) {
  const query =
    "INSERT INTO bookings(bookedat, bookingNumber, screeningid, guesemail, guestphone) VALUES(?, ?, ?, ?, ?)";

  const currentDate = new Date();
  runQuery(query, [
    currentDate.toLocaleString(),
    bookingNumber,
    screeningid,
    guestemail,
    guestphone,
  ]);
}

import { runQuery } from "../db.js";

export async function bookingservice(
  bookingNumber,
  screeningid,
  guestemail,
  guestphone,
  userid,
) {
  const query =
    "INSERT INTO bookings(bookedat, bookingNumber, screeningid, guestemail, guestphone, userid) VALUES(?, ?, ?, ?, ?, ?)";

  const currentDate = new Date();
  return await runQuery(query, [
    currentDate.toLocaleString(),
    bookingNumber,
    screeningid,
    guestemail,
    guestphone,
    userid,
  ]);
}

export async function findBookingByBookingNumber (
  bookingNumber
) {
  const query =
  `SELECT bookingNumber, GROUP_CONCAT(tickets.seatrow, ":", tickets.seatnumber, " ", tickettypes.name) AS tickets
	FROM tickets INNER JOIN tickettypes, bookings 
    WHERE tickets.bookingid = bookings.id AND tickettypes.id = tickets.tickettypeid AND bookings.bookingnumber = ?
    GROUP BY bookings.id`

    const result = await runQuery(query, [bookingNumber]) 
    return result;
}

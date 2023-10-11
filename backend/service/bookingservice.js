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

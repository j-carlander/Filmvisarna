import { runQuery } from "../db.js";

export async function bookingservice(
  bookingNumber,
  screeningid,
  guestemail,
  userid
) {
  const query =
    "INSERT INTO bookings(bookedat, bookingNumber, screeningid, guestemail, userid) VALUES(?, ?, ?, ?, ?)";

  const currentDate = new Date();
  return await runQuery(query, [
    currentDate.toLocaleString("se-SE"),
    bookingNumber,
    screeningid,
    guestemail,
    userid,
  ]);
}

export async function findBookingByBookingNumber(bookingNumber) {
  const query = `SELECT bookingNumber, GROUP_CONCAT(tickets.seatrow, ":", tickets.seatnumber, " ", tickettypes.name) AS tickets
	FROM tickets INNER JOIN tickettypes, bookings 
    WHERE tickets.bookingid = bookings.id AND tickettypes.id = tickets.tickettypeid AND bookings.bookingnumber = ?
    GROUP BY bookings.id`;

  const result = await runQuery(query, [bookingNumber]);
  return result;
}

export function getBookingsByUserId(userid) {
  const query = `
  SELECT m.title, s.date, b.bookingnumber, 
  GROUP_CONCAT(t.seatrow, ":", t.seatnumber, " ", tt.name SEPARATOR ", ") AS tickets, 
  (SELECT SUM(tt.price) FROM tickets t, tickettypes tt WHERE t.tickettypeid = tt.id AND t.bookingid = b.id) AS price 
	  FROM bookings b
    INNER JOIN movies m
    INNER JOIN screenings s
    INNER JOIN tickettypes tt 
    LEFT JOIN tickets t 
    ON t.bookingid = b.id AND t.tickettypeid = tt.id
    WHERE b.userid = ? AND b.screeningid = s.id AND s.movieid = m.id
    GROUP BY b.id;`;

  return runQuery(query, [userid]);
}

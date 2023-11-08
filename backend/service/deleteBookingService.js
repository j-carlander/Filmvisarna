import { runQuery } from "../db.js";

export async function deleteBookingGuestService(bookingnumber, guestemail) {
  const sql = `DELETE from bookings WHERE bookingnumber = ? AND guestemail = ? LIMIT 1`;
  const res = await runQuery(sql, [bookingnumber, guestemail]);
  return res;
}

export async function deleteBookingUserService(bookingnumber, userid) {
  const sql = `DELETE from bookings WHERE bookingnumber = ? AND userid = ? LIMIT 1`;
  const res = await runQuery(sql, [bookingnumber, userid]);
  return res;
}

export async function getSeatsForDeletionService(bookingnumber) {
  const sql = `SELECT seatrow, seatnumber, screeningid FROM tickets WHERE bookingid = (select id from bookings where bookingnumber = ?);`;
  const res = await runQuery(sql, [bookingnumber]);
  const seats = res.map((seat) => ({
    rowNumber: seat.seatrow,
    seatNumber: seat.seatnumber,
  }));
  const screeningId = res[0].screeningid;
  return [seats, screeningId];
}

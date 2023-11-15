import { runQuery } from "../db.js";
import { removeScreeningMailService } from "./removeScreeningMailService.js";

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
  return res;
}

// runs before screening is removed to update users that the screening is canceled
export async function emailAllBookingsByScreeningService(screeningId) {
  const selectDateTitleFromScreening =
    "SELECT date, m.title FROM screenings AS s JOIN movies AS m ON s.movieid = m.id WHERE s.id = ?";

  const res = await runQuery(selectDateTitleFromScreening, [screeningId]);
  const { date, title } = res[0];

  const selectEmailFromBookingsByScreeningId =
    " SELECT CONCAT(COALESCE(b.guestemail,''), COALESCE(u.email,'')) AS email FROM bookings AS b LEFT JOIN users AS u ON b.userid = u.id WHERE b.screeningid = ?";
  const emailsList = await runQuery(selectEmailFromBookingsByScreeningId, [
    screeningId,
  ]);
  console.log(emailsList);
  if (emailsList.length > 0) {
    emailsList.map(({ email }) =>
      removeScreeningMailService(email, title, date)
    );
  }
  return;
}

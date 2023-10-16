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

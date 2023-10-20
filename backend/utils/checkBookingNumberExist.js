import { runQuery } from "../db.js";

export async function checkBookingNumberExist(bookingNumber) {
  const sql = "SELECT id FROM bookings WHERE bookingnumber = ?";
  const res = await runQuery(sql, [bookingNumber]);
  return res[0];
}

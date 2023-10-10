import { runQuery } from "../db.js";

export async function takenseatsService(screeningid) {
  const sql = "SELECT seatrow, seatnumber FROM tickets WHERE screeningid = ?";
  const res = await runQuery(sql, [screeningid]);
  return res;
}

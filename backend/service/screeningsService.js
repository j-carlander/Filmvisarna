import { runQuery } from "../db.js";

export async function screeningsService(screeningid) {
  const sql = "SELECT id, date, movieid FROM screenings WHERE id = ?";
  const res = await runQuery(sql, [screeningid]);
  return res;
}

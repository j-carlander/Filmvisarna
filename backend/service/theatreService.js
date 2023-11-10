import { runQuery } from "../db.js";

export async function getTheatres() {
  const sql = `SELECT * FROM theatres`;

  const res = await runQuery(sql);

  return res;
}

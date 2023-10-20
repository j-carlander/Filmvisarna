import { runQuery } from "../db.js";

export async function theatrelayoutService(theatreid) {
  const sql = `select rownumber, numberofseats from theatrerows where theatreid = ?;`;
  const res = await runQuery(sql, [theatreid]);
  return res;
}

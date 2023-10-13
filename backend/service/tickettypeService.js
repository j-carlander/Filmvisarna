import { runQuery } from "../db.js";

export async function tickettypeService() {
  const sql = "SELECT * FROM tickettypes";
  const res = await runQuery(sql);
  return res;
}

import { runQuery } from "../db.js";

export async function addNameService(name) {
  const sql = `INSERT INTO names (name) VALUES (?);`;

  const result = await runQuery(sql, [name]);

  return result;
}

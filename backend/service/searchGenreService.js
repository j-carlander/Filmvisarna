import { runQuery } from "../db.js";

export async function searchGenreService(query) {
  const sql = `SELECT * FROM categories WHERE category LIKE ?;`;

  const result = await runQuery(sql, [query + "%"]);

  return result;
}

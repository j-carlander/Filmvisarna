import { runQuery } from "../db.js";

export async function addGenreService(genre) {
  const sql = `INSERT INTO categories (category) VALUES (?);`;

  const result = await runQuery(sql, [genre]);

  return result;
}

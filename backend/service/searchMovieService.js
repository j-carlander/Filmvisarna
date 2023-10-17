import { runQuery } from "../db.js";

export async function searchMovieService(q) {
  const query = `%${q}%`;
  const sql = `
  SELECT title
  FROM movies 
  WHERE title LIKE ? ;
    `;

  const result = await runQuery(sql, [query]);
  return result[0];
}

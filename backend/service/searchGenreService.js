/*
  This JavaScript file exports a function named searchGenreService that searches for movie genres in a database, matching the provided query. It uses a SQL query to find categories with names that start with the given query, and the results are returned using the runQuery function 
*/

import { runQuery } from "../db.js";

export async function searchGenreService(query) {
  const sql = `SELECT * FROM categories WHERE category LIKE ?;`;

  const result = await runQuery(sql, [query + "%"]);

  return result;
}

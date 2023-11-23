/*
  This file contains a function named getTheatres that fetches information about theaters from the database. Using a straightforward SQL query to select all records from the "theatres" table, the function then returns the results using the runQuery function
*/
import { runQuery } from "../db.js";

export async function getTheatres() {
  const sql = `SELECT * FROM theatres`;

  const res = await runQuery(sql);

  return res;
}

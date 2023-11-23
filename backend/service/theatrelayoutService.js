/*
  This file contains a function called theatrelayoutService that fetches details about the seating layout of a specific theater from the database. Using a SQL query, it retrieves the row numbers and the corresponding number of seats from the "theatrerows" table based on the provided theater ID. The function then returns this information using the runQuery function 
*/
import { runQuery } from "../db.js";

export async function theatrelayoutService(theatreid) {
  const sql = `select rownumber, numberofseats from theatrerows where theatreid = ?;`;
  const res = await runQuery(sql, [theatreid]);
  return res;
}

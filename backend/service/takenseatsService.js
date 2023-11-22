/*
  This file provides a function called takenseatsService that checks the database for information on seats that have been booked for a given movie screening. The function uses a SQL query to fetch seat rows and numbers from the "tickets" table based on the provided screening ID. The results are then returned using the runQuery function
*/
import { runQuery } from "../db.js";

export async function takenseatsService(screeningid) {
  const sql = "SELECT seatrow, seatnumber FROM tickets WHERE screeningid = ?";
  const res = await runQuery(sql, [screeningid]);
  return res;
}

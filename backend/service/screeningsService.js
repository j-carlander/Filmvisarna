/*
  This JavaScript file contains three functions for managing movie screenings. The screeningsService function retrieves details of a specific screening by its ID, the addScreening function adds a new screening to the database using provided information, and the removeScreening function deletes a screening based on its ID. All functions use SQL queries executed with the runQuery function.
*/
import { runQuery } from "../db.js";

export async function screeningsService(screeningid) {
  const sql = "SELECT id, date, movieid FROM screenings WHERE id = ?";
  const res = await runQuery(sql, [screeningid]);
  return res;
}

export async function addScreening(info) {
  const sql = `
  INSERT INTO screenings 
  (date, movieid, theatreid, languageid, subtitleid) 
  VALUES (?, ?, ?, ?, ?)`;

  const res = await runQuery(sql, [
    info.date,
    info.movieid,
    info.theatreid,
    info.languageid,
    info.subtitleid,
  ]);

  return res;
}

export async function removeScreening(screeningId) {
  const sql = "DELETE FROM screenings WHERE id = ?";
  const res = await runQuery(sql, [screeningId]);
  return res;
}

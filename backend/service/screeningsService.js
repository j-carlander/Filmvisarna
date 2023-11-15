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

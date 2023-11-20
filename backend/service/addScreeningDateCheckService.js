/**
 * Service function that checks if a screening date clashes with an already planed screening
 * returns true if not clashing
 */

import { runQuery } from "../db.js";

export async function addScreeningDateCheckService(
  date,
  dateTime,
  theatreid,
  movieid
) {
  const dateForQuery = `${date}%`;
  const queryScreenings = `SELECT date, theatreid, DATE_ADD(date, INTERVAL (durationinminutes + 30) MINUTE) AS endtime, DATE_SUB(date, INTERVAL 30 MINUTE) AS starttime FROM screenings JOIN movies ON screenings.movieid = movies.id WHERE date LIKE ? AND theatreid = ? `;
  const queryMovieDuration = `SELECT durationinminutes FROM movies WHERE id = ?`;

  const [resScreenings, resMovieDuration] = await Promise.all([
    runQuery(queryScreenings, [dateForQuery, theatreid]),
    runQuery(queryMovieDuration, [movieid]),
  ]);

  const newScreeningEndTime = new Date(
    new Date(dateTime).getTime() + resMovieDuration[0].durationinminutes * 60000
  );

  if (resScreenings.length === 0) return true;

  const clashingScreenings = resScreenings.map((screening) => {
    if (screening.theatreid !== theatreid) return true;

    return new Date(screening.starttime) > newScreeningEndTime ||
      new Date(screening.endtime) < new Date(dateTime)
      ? true
      : false;
  });

  return clashingScreenings.every((screening) => screening);
}

/*
  This JavaScript file contains two functions. The screeninginfoService function retrieves information about upcoming movie screenings, including details like date, language, and available seats, based on the movie ID and pagination. The screeningInfoById function fetches specific details about a movie screening, such as screening and movie ID, title, age limit, duration, and theatre information, filtered by the screening ID and upcoming dates. Both functions use SQL queries and the runQuery function to interact with the database.
*/
import { runQuery } from "../db.js";

export async function screeninginfoService(movieid, page) {
  const currentDate = new Date();
  const sql = `
  SELECT scr.id,
  scr.date AS screeningDate,
  lang.language AS language,
  sub.language AS subtitle,
  the.name AS theatre,
  (SELECT SUM(numberofseats) FROM theatrerows WHERE theatrerows.theatreid = scr.theatreid ) AS totalSeats,
  (SELECT SUM(numberofseats) FROM theatrerows WHERE theatrerows.theatreid = scr.theatreid ) -
  (SELECT COUNT(tickets.bookingid) FROM tickets WHERE tickets.screeningid = scr.id) AS freeSeats
  FROM screenings AS scr, languages AS lang, languages AS sub, theatres AS the
  WHERE scr.languageid = lang.id
  AND scr.subtitleid = sub.id
  AND scr.theatreid = the.id
  AND scr.movieid = ? 
  AND scr.date >= ? 
  ORDER BY screeningDate
  LIMIT ?, 3;`;
  const res = await runQuery(sql, [movieid, currentDate, Number(page) || 0]);
  return res;
}

export async function screeningInfoById(screeningId) {
  const currentDate = new Date();
  const sql = `
  SELECT scr.id,
  movies.title,
  movies.id AS movieid,
  movies.agelimit,
  movies.durationinminutes,
  scr.date AS screeningDate,
  the.name AS theatre,
  the.id AS theatreId
  FROM screenings AS scr, theatres AS the, movies
  WHERE scr.theatreid = the.id
  AND scr.movieid = movies.id 
  AND scr.id = ?
  AND scr.date >= ?;`;

  return await runQuery(sql, [screeningId, currentDate]);
}

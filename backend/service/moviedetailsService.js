import { runQuery } from "../db.js";
import { getDateQueryArray } from "./moviesService.js";

export async function getMovieDetails(movieid) {
  const sql = `SELECT 
  movies.id,
  title, 
  description, 
  trailerlink, 
  durationinminutes, 
  agelimit, 
  name AS director,
  releasedate, 
  (SELECT GROUP_CONCAT(name) FROM names INNER JOIN movieactors WHERE movieactors.nameid = names.id AND movieactors.movieid = movies.id) AS actors,
  GROUP_CONCAT(category) AS categories
  FROM movies
  INNER JOIN moviecategories
  INNER JOIN names
  LEFT JOIN categories 
    ON moviecategories.movieid = movies.id AND moviecategories.categoryid = categories.id
  WHERE movies.id = ? AND directorid = names.id
  GROUP BY movies.id;`;

  const res = await runQuery(sql, [movieid]);

  return res;
}

export async function getScreeningsByDateService(movieid, date) {
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
  AND scr.date >= ? AND scr.date < ?
  AND scr.subtitleid = sub.id
  AND scr.theatreid = the.id
  AND scr.movieid = ?
  ORDER BY screeningDate;`;
  const res = await runQuery(sql, [...getDateQueryArray(date), movieid]);
  return res;
}

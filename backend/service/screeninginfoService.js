import { runQuery } from "../db.js";

export async function screeninginfoService(movieid) {
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
  ORDER BY screeningDate;`;
  const res = await runQuery(sql, [movieid]);
  return res;
}

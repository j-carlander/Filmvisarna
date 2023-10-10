import { runQuery } from "../db.js";

export async function screeninginfoService(movieid) {
    const sql = `
    SELECT s.id, s.date, s.movieid, s.theatreid, s.languageid, s.subtitleid
    FROM screenings s
    INNER JOIN movies m ON s.movieid = m.id
    WHERE m.id = ?;`;
    const res = await runQuery(sql, [movieid]);
    return res;
}
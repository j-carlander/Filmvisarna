import { runQuery } from "../db.js";

export async function getMovieDetails(movieid) {
  const sql = `SELECT 
  title, 
  description, 
  image, 
  trailerlink, 
  durationinminutes, 
  agelimit, 
  directorid, 
  releasedate 
  FROM movies WHERE id = ?;`;

  const res = await runQuery(sql, [movieid]);

  return res;
}

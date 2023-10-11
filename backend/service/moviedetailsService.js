import { runQuery } from "../db.js";

export async function getMovieDetails(movieid) {
  const sql = `SELECT 
  title, 
  description, 
  CONVERT(image USING utf8mb4) AS image,
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

import { runQuery } from "../db.js";

async function getMovies() {
  const sql = `SELECT 
  title, 
  CONVERT(image USING utf8mb4) AS image, 
  durationinminutes, 
  agelimit, 
  GROUP_CONCAT(category) AS categories 
  FROM movies 
  INNER JOIN moviecategories 
  LEFT JOIN categories 
  ON moviecategories.categoryid = categories.id AND moviecategories.movieid = movies.id
  GROUP BY movies.id;`;

  const res = await runQuery(sql);

  return res;
}

export default { getMovies };

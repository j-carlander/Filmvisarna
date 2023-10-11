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

async function getMoviesByDate(date) {
  const sql = `SELECT 
  title, 
  CONVERT(image USING utf8mb4) AS image, 
  durationinminutes, 
  agelimit, 
  GROUP_CONCAT(category) AS categories 
  FROM movies 
  INNER JOIN moviecategories 
  INNER JOIN screenings 
  LEFT JOIN categories 
  ON moviecategories.categoryid = categories.id AND moviecategories.movieid = movies.id WHERE 
  screenings.date > ? AND screenings.date < ? AND screenings.movieid = movies.id 
  GROUP BY movies.id;`;

  const result = await runQuery(sql, getDateQueryArray(date));

  return result;
}

function getDateQueryArray(date) {
  const startDate = new Date(date);
  const nextDayTimeIncrease = startDate.getTime() + 24 * 60 * 60 * 1000;
  const nextDayDate = new Date(date);
  nextDayDate.setTime(nextDayTimeIncrease);

  const startDateString = startDate.toLocaleDateString();
  const nextDayString = nextDayDate.toLocaleDateString();

  return [startDateString, nextDayString];
}

export default { getMovies, getMoviesByDate };

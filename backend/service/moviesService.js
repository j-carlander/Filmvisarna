import { runQuery } from "../db.js";

async function getMovies(filters) {
  const checkConditions = [],
    values = [];

  for (let key of Object.keys(filters)) {
    if (!filters[key]) continue;

    if (key === "date") {
      values.push(...getDateQueryArray(filters.date));
      checkConditions.push(
        "screenings.date > ? AND screenings.date < ? AND screenings.movieid = movies.id"
      );
    } else if (key === "age") {
      values.push(filters[key]);
      checkConditions.push("movies.agelimit = ?");
    } else if (key === "upcoming") {
      values.push(new Date().toLocaleDateString("se-SE"));
      const upQuery =
        filters.upcoming === "true"
          ? "? < movies.releasedate"
          : "? >= movies.releasedate";
      checkConditions.push(upQuery);
    }
  }

  const sql = `SELECT 
  movies.id,
  title, 
  durationinminutes, 
  agelimit, 
  GROUP_CONCAT(category) AS categories 
  FROM movies 
  INNER JOIN moviecategories 
  ${filters.date ? "INNER JOIN screenings" : ""} 
  LEFT JOIN categories 
  ON moviecategories.categoryid = categories.id AND moviecategories.movieid = movies.id ${
    checkConditions.length > 0 ? "WHERE" : ""
  } 
  ${checkConditions.join(" AND ")} 
  GROUP BY movies.id;`;

  const result = await runQuery(sql, values);

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

export default { getMovies };

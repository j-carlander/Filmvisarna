/*
This JavaScript file defines a function getMovies that retrieves movie information from a database based on specified filters. The filters can include criteria such as date, age limit, and whether the movies are upcoming. The function dynamically constructs a SQL query based on the provided filters and executes it using the runQuery function from the "../db.js" module. Additionally, there's a utility function getDateQueryArray that generates an array representing the start and end dates for a given date, formatted according to the "se-SE" locale.
*/

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
  
  checkConditions.push("movies.ishidden = FALSE");

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

export function getDateQueryArray(date) {
  const startDate = new Date(date);
  const nextDayTimeIncrease = startDate.getTime() + 24 * 60 * 60 * 1000;
  const nextDayDate = new Date(date);
  nextDayDate.setTime(nextDayTimeIncrease);

  const startDateString = startDate.toLocaleDateString("se-SE");
  const nextDayString = nextDayDate.toLocaleDateString("se-SE");

  return [startDateString, nextDayString];
}

export default { getMovies };

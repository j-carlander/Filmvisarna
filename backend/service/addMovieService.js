import { runQuery } from "../db.js";

export async function addMovieService({
  title,
  description,
  releaseDate,
  trailerLink,
  durationInMinutes,
  ageLimit,
  directorId,
  categoryIds,
  actorNames,
}) {
  try {
    const movieInsertQuery = `
      INSERT INTO movies (title, description, releasedate, trailerlink, durationinminutes, agelimit, directorid)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const movieValues = [title, description, releaseDate, trailerLink, durationInMinutes, ageLimit, directorId];
    const { insertId: movieId } = await runQuery(movieInsertQuery, movieValues);

    const categoryInsertQuery = `
      INSERT INTO moviecategories (categoryid, movieid)
      VALUES (?, ?)
    `;
    const categoryValues = categoryIds.map(categoryId => [categoryId, movieId]);
    await Promise.all(categoryValues.map(values => runQuery(categoryInsertQuery, values)));

    const actorInsertQuery = `
      INSERT INTO movieactors (movieid, nameid)
      VALUES (?, ?)
    `;
    const actorValues = actorNames.map(nameId => [movieId, nameId]);
    await Promise.all(actorValues.map(values => runQuery(actorInsertQuery, values)));

    return { success: true, message: "Movie added successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal server error" };
  }
}

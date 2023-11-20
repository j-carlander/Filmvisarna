/**
 * Controller for handling requests to add a movie
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 201 and a message in Swedish that the movie was added on success
 */

import { addMovieService } from "../service/addMovieService.js";

export async function addMovie(req, res) {
  const {
    title,
    description,
    releaseDate,
    trailerLink,
    durationInMinutes,
    ageLimit,
    directorId,
    categoryIds,
    actorNames,
    base64Img,
    languageIds,
  } = req.body;

  const result = await addMovieService({
    title,
    description,
    releaseDate,
    trailerLink,
    durationInMinutes,
    ageLimit,
    directorId,
    categoryIds,
    actorNames,
    base64Img,
    languageIds,
  });

  if (result.success) {
    res.status(201).json({ message: "Filmen har lagts till." });
  } else {
    res.status(500).json({ error: "Internt serverfel!" });
  }
}

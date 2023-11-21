/**
 * A middleware for checking that data for all fields is provided with the request for adding a new movie
 * if not, aborts the request and responds with a status 400 and a message in Swedish that all fields are required
 */

export function validateAddMovie(req, res, next) {
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

  // Check if all required fields are present
  if (
    !title ||
    !description ||
    !releaseDate ||
    !trailerLink ||
    !durationInMinutes ||
    !ageLimit ||
    !directorId ||
    !categoryIds ||
    !actorNames ||
    !base64Img ||
    !languageIds
  ) {
    return res.status(400).json({ error: "Alla fält är nödvändiga." });
  }
  next();
}

// middleware/validateAddMovie.js
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
    !base64Img
  ) {
    return res.status(400).json({ error: "Alla fält är nödvändiga." });
  }
  next();
}

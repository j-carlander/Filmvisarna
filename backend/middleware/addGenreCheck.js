/**
 * A middleware for checking that the data provided with the request for adding a new genre is of expected format
 * if not, aborts the request and responds with a status 400 and a message in Swedish that a genre wasn't provided 
 * or that it was in the wrong format
 */

export function addGenreCheck(req, res, next) {
  const { genre } = req.body;

  if (!genre || typeof genre !== "string" || genre.length === 0)
    return res
      .status(400)
      .json({ error: "Saknar genre eller så har det fel format!" });

  next();
}

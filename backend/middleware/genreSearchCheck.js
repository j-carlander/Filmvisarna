/**
 * A middleware for checking that if a query is sent with a search genre request, it is not empty and of type string
 * if empty or not of type string, aborts the request and responds with a status 400 and a message in Swedish
 * that no value for search was provided or that was of the wrong type
 */

export function searchGenreCheck(req, res, next) {
  const { q } = req.query;

  if (!q || typeof q !== "string" || q.length === 0)
    return res
      .status(400)
      .json({ error: "q är inte definerad eller har fel format!" });

  next();
}

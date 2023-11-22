/**
 * A middleware for checking that if a query is sent with a search request, it is not empty
 * if empty, aborts the request and responds with a status 400 and a message in Swedish that no value for search was provided
 */

export async function checkSearchQuery(req, res, next) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Sökfält ej ifyllt!" });

  next();
}

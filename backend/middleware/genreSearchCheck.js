export function searchGenreCheck(req, res, next) {
  const { q } = req.query;

  if (!q || typeof q !== "string" || q.length === 0)
    return res
      .status(400)
      .json({ error: "q är inte definerad eller har fel format!" });

  next();
}

export function addGenreCheck(req, res, next) {
  const { genre } = req.body;

  if (!genre || typeof genre !== "string" || genre.length === 0)
    return res
      .status(400)
      .json({ error: "Saknar genre eller så har det fel format!" });

  next();
}

export async function checkSearchQuery(req, res, next) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Sökfält ej ifyllt!" });

  next();
}

export function checkName(req, res, next) {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.length === 0)
    return res
      .status(400)
      .json({ error: "Namnet skickades inte med eller har fel format!" });

  next();
}

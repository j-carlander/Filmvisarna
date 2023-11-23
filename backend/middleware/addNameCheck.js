/**
 * A middleware for checking that the data provided with the request for adding a new name is of expected format
 * if not, aborts the request and responds with a status 400 and a message in Swedish that a name wasn't provided
 * or that it was in the wrong format
 */

export function checkName(req, res, next) {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.length === 0)
    return res
      .status(400)
      .json({ error: "Namnet skickades inte med eller har fel format!" });

  next();
}

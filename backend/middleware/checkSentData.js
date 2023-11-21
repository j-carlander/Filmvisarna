/**
 * A middleware for checking that the data provided with the request is of expected type and format
 * if not, aborts the request and responds with a status 400 and a message in Swedish that data was in the wrong format
 */

export async function validateData(req, res, next) {
  const errors = {};
  const fields = req.body;

  for (const field of Object.keys(fields)) {
    if (typeof req.body[field] !== "string" || req.body[field].trim() === "") {
      errors[field] = `${field} är ogiltigt!`;
    }
  }

  //Displayar error beroende på antal fields som är invalid.
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: errors });
  }
  next();
}

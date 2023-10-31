//fields är en array som containar all inputs så vi kan loopa genom alla.
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

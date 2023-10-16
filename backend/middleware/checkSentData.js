//fields är en array som containar all inputs så vi kan loopa genom alla.
export async function validateData(req, res, fields) {
  const errors = {};

  for (const field of fields) {
    if (typeof req.body[field] !== "string" || req.body[field].trim() === "") {
      errors[field] = `${field} is invalid`;
    }
  }

  //Displayar error beroende på antal fields som är invalid.
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
}

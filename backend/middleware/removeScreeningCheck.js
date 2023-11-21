/**
 * A middleware for checking that the screening id provided as a parameter with a request to delete a screening, is a valid screening id.
 * if the id doesn't exist, aborts the request and responds with a status 400 and a message in Swedish that the screening id is invalid
 */

export function removeScreeningCheck(req, res, next) {
  const { screeningId } = req.params;

  if (!screeningId || isNaN(Number(screeningId))) {
    return res.status(400).json({ error: "Ogiltigt visnings ID!" });
  }

  next();
}

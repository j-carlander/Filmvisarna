/**
 * A middleware for checking that if a screening id is provided as a parameter with a request, it is of expected type
 * and that it is a valid screening id.
 * if of wrong type, aborts the request and responds with a status 400 and a message in Swedish that the id should be a number
 * if the id doesn't exist, aborts the request and responds with a status 404 and a message in Swedish that the screening doesn't exist
 */

import { screeningsService } from "../service/screeningsService.js";

export async function checkScreeningId(req, res, next) {
  const { screeningid } = req.params;
  if (isNaN(Number(screeningid))) {
    return res
      .status(400)
      .json({ error: "Screening Id måste vara ett nummer!" });
  }
  const result = await screeningsService(screeningid);
  if (result.length == 0) {
    return res.status(404).json({ error: "Visningen existerar inte!" });
  }
  next();
}

/**
 * Controller for handling requests to remove a screening
 * To be used by admin and Super role only, checked in corresponding middleware
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 201 and a removed screening on success
 */

import { emailAllBookingsByScreeningService } from "../service/deleteBookingService.js";
import { removeScreening } from "../service/screeningsService.js";

export async function removeScreeningRoute(req, res) {
  const { screeningId } = req.params;

  await emailAllBookingsByScreeningService(screeningId);

  const result = await removeScreening(screeningId);
  if (result.affectedRows !== 1) {
    return res.status(500).json({ error: "Internt serverfel!" });
  }

  res.status(201).json({ message: "Visningen har tagits bort!" });
}

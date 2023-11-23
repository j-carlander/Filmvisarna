/**
 * Controller for handling requests to get theatres (Stora och lilla Visaren) by id
 * sends response status 404 and a message in Swedish if no theatree was found
 * sends response status 200 and the theatre information on success
 */

import { theatrelayoutService } from "../service/theatrelayoutService.js";

export async function theatreLayout(req, res) {
  const { theatreid } = req.params;

  const result = await theatrelayoutService(theatreid);
  if (!result || result.length === 0) {
    return res.status(404).json({ error: "Salongen hittades inte!" });
  }
  res.status(200).json(result);
}

/**
 * Controller for handling requests to get theatres (Stora och lilla Visaren)
 * To be used by Admin or Super role only, checked in corresponding middleware
 * sends response status 200 and the theatres information on success
 */

import { getTheatres } from "../service/theatreService.js";

export async function getTheatresController(req, res) {
  const result = await getTheatres();

  res.json(result);
}

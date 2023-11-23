/**
 * Controller for handling requests to search for a movie genre
 * To be used by admin or super role only, checked in corresponding middleware
 * sends response status 404 and a message in Swedish if no query was provided
 * sends response status 200 and the genre on success
 */

import { searchGenreService } from "../service/searchGenreService.js";

export async function searchGenre(req, res) {
  const { q } = req.query;

  const result = await searchGenreService(q);

  if (result.length === 0)
    return res
      .status(404)
      .json({ error: "Vi hittade ingen genre som matchade din sökning!" });

  res.json(result);
}

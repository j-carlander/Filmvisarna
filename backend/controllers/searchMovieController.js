/**
 * Controller for handling requests to search for a movie
 * (for example: title, actors, genre)
 * sends response status 404 and a message in Swedish if no query was
 * found by that searched word
 * sends response status 200 and the result on success
 */

import { searchMovieService } from "../service/searchMovieService.js";
import { formatSearchResult } from "../utils/formatSearchResult.js";

export async function searchMovieController(req, res) {
  const { q } = req.query;

  const result = await searchMovieService(q);

  if (result.length === 0)
    return res
      .status(404)
      .json({ message: `Vi hittade inget som matchade din sökning!` });

  const formatetResult = formatSearchResult(result);

  const jsonResponse = {
    query: q,
    result: formatetResult,
  };

  res.status(200).json(jsonResponse);
}

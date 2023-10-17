import { searchMovieService } from "../service/searchMovieService.js";
import { formatSearchResult } from "../utils/formatSearchResult.js";

export async function searchMovieController(req, res) {
  const { q } = req.query;

  const result = await searchMovieService(q);

  if (result.length === 0)
    return res
      .status(204)
      .json({ message: `Sorry, we have nothing that match your query` });

  const formatetResult = formatSearchResult(result);

  const jsonResponse = {
    query: q,
    result: formatetResult,
  };

  res.status(200).json(jsonResponse);
}

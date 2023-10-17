import { searchMovieService } from "../service/searchMovieService.js";

export async function searchMovieController(req, res) {
  const { q } = req.query;

  const result = await searchMovieService(q);

  if (result.length === 0)
    return res
      .status(204)
      .json({ message: `Sorry, we have nothing that match your query` });

  const jsonResponse = {
    query: q,
    result,
  };

  res.status(200).json(jsonResponse);
}

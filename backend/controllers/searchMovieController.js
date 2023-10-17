import { searchMovieService } from "../service/searchMovieService.js";

export async function searchMovieController(req, res) {
  const { q } = req.query;

  const result = await searchMovieService(q);

  if (!result)
    return res.status(204).json({ message: `Sorry, we don't have that movie` });

  res.status(200).json(result);
}

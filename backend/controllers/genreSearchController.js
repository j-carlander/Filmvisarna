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

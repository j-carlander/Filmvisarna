import { getTheatres } from "../service/theatreService.js";

export async function getTheatresController(req, res) {
  const result = await getTheatres();

  res.json(result);
}

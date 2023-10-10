import { getMovieDetails } from "../service/moviedetailsService.js";

export async function getMovieDetailsController(req, res) {
  const { movieid } = req.params;
  const result = await getMovieDetails(movieid);
  res.send(result);
}

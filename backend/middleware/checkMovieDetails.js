import { getMovieDetails } from "../service/moviedetailsService.js";

export async function checkMovieDetails(req, res, next) {
  const { movieid } = req.params;
  const result = await getMovieDetails(movieid);
  if (result.length == 0) {
    return res.status(404).send("Movie does not exist");
  }
  next();
}

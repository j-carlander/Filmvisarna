import { getMovieDetails } from "../service/moviedetailsService.js";

export async function checkMovieDetails(req, res, next) {
  const { movieid } = req.params;
  const result = await getMovieDetails(movieid);
  if (result.length == 0) {
    return res.status(404).json({ error: "Filmen existerar inte!" });
  }
  next();
}

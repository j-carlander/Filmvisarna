/**
 * A middleware for checking that the movieid provided with the request for getting details for a movie exists is real
 * if not, aborts the request and responds with a status 400 and a message in Swedish that the Requested movie dosen't exist
 */

import { getMovieDetails } from "../service/moviedetailsService.js";

export async function checkMovieDetails(req, res, next) {
  const { movieid } = req.params;
  const result = await getMovieDetails(movieid);
  if (result.length == 0) {
    return res.status(404).json({ error: "Filmen existerar inte!" });
  }
  next();
}

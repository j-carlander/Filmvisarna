import {
  getMovieDetails,
  getScreeningsByDateService,
} from "../service/moviedetailsService.js";

export async function getMovieDetailsController(req, res) {
  const { movieid } = req.params;
  const result = await getMovieDetails(movieid);
  res.send(result);
}

export async function getScreeningsByDate(req, res) {
  const { movieid, date } = req.params;
  const result = await getScreeningsByDateService(movieid, date);
  res.send(result);
}

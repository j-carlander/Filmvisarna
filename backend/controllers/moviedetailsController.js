/**
 * Controller for handling requests to get movie details by id
 * and filter movie details by date
 * sends response status 200 and result on success
 */

import {
  getMovieDetails,
  getScreeningsByDateService,
} from "../service/moviedetailsService.js";
import { formatDateTimeSwe } from "../utils/formatDateTime.js";

export async function getMovieDetailsController(req, res) {
  const { movieid } = req.params;
  const result = await getMovieDetails(movieid);
  res.send(result);
}

export async function getScreeningsByDate(req, res) {
  const { movieid, date } = req.params;
  const result = await getScreeningsByDateService(movieid, date);

  for (let screening of result) {
    screening.screeningDate = formatDateTimeSwe(screening.screeningDate);
  }

  res.send(result);
}

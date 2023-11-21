/**
 * Controller for handling requests get movies and filters for movies (date, age and upcoming)
 * sends response status 200 and result on success
 */

import moviesService from "../service/moviesService.js";

export async function getMovies(req, res) {
  const { date, age, upcoming } = req.query;

  const filters = { date, age, upcoming };

  const result = await moviesService.getMovies(filters);

  res.send(result);
}

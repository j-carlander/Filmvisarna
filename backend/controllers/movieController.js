import moviesService from "../service/MoviesService.js";

export async function getMovies(req, res) {
  const { date, age } = req.query;

  const filters = { date, age };

  const result = await moviesService.getMovies(filters);

  res.send(result);
}

import moviesService from "../service/MoviesService.js";

export async function getMovies(req, res) {
  const { date, age, upcoming } = req.query;

  const filters = { date, age, upcoming };

  const result = await moviesService.getMovies(filters);

  res.send(result);
}

import moviesService from "../service/MoviesService.js";

export async function getMovies(req, res) {
  const result = await moviesService.getMovies();
  res.send(result);
}

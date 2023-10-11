import moviesService from "../service/MoviesService.js";

export async function getMovies(req, res) {
  const { date } = req.query;

  let result;

  if (date) {
    result = await moviesService.getMoviesByDate(date);
  } else {
    result = await moviesService.getMovies();
  }

  res.send(result);
}

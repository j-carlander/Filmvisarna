import { MovieCard } from "../../components/MovieCard/MovieCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchHelper } from "../../utils/fetchHelper";
import MovieFilters from "../../components/MovieFilterOptions/MovieFilters";

export function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const upcomingParam = params.get("upcoming");

  useEffect(() => {
    async function getMovies() {
      const response = await fetchHelper("/movies", "get");
      const data = await response.json();
      setMovies(data);
    }
    getMovies();
  }, []);
  return (
    <>
      <h1 className="moviepage-title">Filmer</h1>
      <MovieFilters {...{ setMovies }} initialUpcoming={upcomingParam} />
      <section className="moviepage-wrapper">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </section>
    </>
  );
}

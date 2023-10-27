import { MovieCard } from "../../components/MovieCard/MovieCard";
import { useEffect, useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import MovieFilters from "../../components/MovieFilterOptions/MovieFilters";

export function MoviesPage() {
  const [movies, setMovies] = useState([]);

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
      <MovieFilters {...{ setMovies }} />
      <section className="moviepage-wrapper">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </section>
    </>
  );
}

/**
 * The jsx for a movie overview page
 * movies is set in moviefilters component
 * maps a moviecard component for each movie
 */

import { MovieCard } from "../../components/MovieCard/MovieCard";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieFilters from "../../components/MovieFilterOptions/MovieFilters";

export function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const [params] = useSearchParams();
  const upcomingParam = params.get("upcoming");

  return (
    <>
      <h1 className="moviepage-title">Filmer</h1>
      <MovieFilters {...{ setMovies }} initialUpcoming={upcomingParam} />
      {movies.length > 0 ? (
        <section className="moviepage-wrapper">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </section>
      ) : (
        <p className="no-movies-text">
          Vi hittade inga filmer som matchade din sökning!
        </p>
      )}
    </>
  );
}

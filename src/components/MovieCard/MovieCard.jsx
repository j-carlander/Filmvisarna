/**
 * Component for movie card
 * MovieCard takes a prop and renders the movie information 
 * in a card format
 */

import { useNavigate } from "react-router-dom";
import { movieLengthFormatter } from "../../utils/movieLengthFormatter";
import { ageLimitFormatter } from "../../utils/ageLimitFormatter";

export function MovieCard({ movie }) {
  const navigate = useNavigate();
  function onMovieClick() {
    navigate(`/filmer/${movie.id}`);
  }
  return (
    <article onClick={onMovieClick} className="movie-card">
      <span className="card-agelimit">{ageLimitFormatter(movie.agelimit)}</span>
      <img
        className="card-img"
        src={`/images/${movie.id}_w200.webp`}
        srcSet={`/images/${movie.id}_w200.webp 200w, /images/${movie.id}_w400.webp 400w`}
        sizes="(max-width: 400px) 200px, 400px"
        alt="movie-poster"
      />
      <h3 className="card-title">{movie.title}</h3>
      <p className="card-info">
        <span>{movie.categories.split(",")[0]}</span>{" "}
        <span>{movieLengthFormatter(movie.durationinminutes)}</span>
      </p>
    </article>
  );
}

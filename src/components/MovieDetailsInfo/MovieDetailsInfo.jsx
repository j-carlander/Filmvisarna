/**
 * Component for movie details information
 * MovieDetailsInfo takes a prop and renders the movie information in a card format
 */

import { movieLengthFormatter } from "../../utils/movieLengthFormatter";
import { ageLimitFormatter } from "../../utils/ageLimitFormatter";

export function MovieDetailsInfo({ movie }) {
  return (
    <article className="moviedetail-card">
      <img
        className="moviedetail-img"
        src={`/images/${movie.id}_w1400.webp`}
        alt="movie-poster"
      />

      <div className="moviedetail-wrapper">
        <div className="trailer">
          <iframe
            className="trailer-iframe"
            src={movie.trailerlink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
        </div>
        <div className="moviedetail-infobox">
          <h3 className="moviedetail-title">{movie.title}</h3>
          <p className="moviedetail-info">
            {movie.categories.replaceAll(",", ", ")} |{" "}
            {movieLengthFormatter(movie.durationinminutes)} |{" "}
            {ageLimitFormatter(movie.agelimit)}
          </p>
          <p className="moviedetail-desc">{movie.description}</p>
          <p className="moviedetail-director">
            <span>Regissör </span> {movie.director}
          </p>
          <p className="moviedetail-actor">
            <span>Skådespelare </span> {movie.actors.replaceAll(",", ", ")}
          </p>
        </div>
      </div>
    </article>
  );
}

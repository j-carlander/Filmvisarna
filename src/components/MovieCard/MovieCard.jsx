import { movieLengthFormatter } from "../../utils/movieLengthFormatter"
import { ageLimitFormatter } from "../../utils/ageLimitFormatter"

export function MovieCard ({movie}) {
    return (
        <article>
            <span>{ageLimitFormatter(movie.agelimit)}</span>
            <img src={`/images/${movie.id}_w200.webp`}/>
            <h3>{movie.title}</h3>
            <p>{movie.categories.replaceAll(",", " ")} <span>{movieLengthFormatter(movie.durationinminutes)}</span></p>
        </article>
    )
}



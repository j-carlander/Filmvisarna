import { MovieCard } from "../../components/MovieCard/MovieCard"
import { useEffect, useState } from "react"
import { fetchHelper } from "../../utils/fetchHelper"

export function MoviesPage () {
    const [ movies, setMovies ] = useState ([]);

    useEffect (
        () => {
        async function getMovies () {
            const response = await fetchHelper("/movies", "get")
            const data = await response.json() 
            setMovies(data)
            console.log(data)
        }
        getMovies()
        }, []
    )
    return (
    <>
    <h1 className="moviepage-title">Filmer</h1>
    <section className="moviepage-wrapper">
        {movies.map((movie, index) => <MovieCard key={index} movie = {movie}/>)}
    </section>
    
    </>
    )
}


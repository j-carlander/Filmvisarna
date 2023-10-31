import { useEffect, useState } from "react"
import { fetchHelper } from "../../utils/fetchHelper"
import { Link, useNavigate } from "react-router-dom";


export function LandingPage() {
    const [ movies, setMovies ] = useState ([]);
    const [upcomingMovies, setUpcomingMovies] = useState ([]);
    const navigate = useNavigate();

    useEffect (
        () => {
        async function getMovies () {
            const response = await fetchHelper("/movies?upcoming=false", "get")
            const data = await response.json() 
            setMovies(data)
        }
        async function upComingMovies () {
            const response = await fetchHelper(`/movies?upcoming=true`, "get")
            const data = await response.json() 
            setUpcomingMovies(data)
        }
        getMovies()
        upComingMovies()
        }, []
    )


    return (
        <div className="landingpage-container">
            <section className="landingpage-card">
                <div className="landingpage-card-info">
                    <h4>På bio nu</h4>
                    <Link to="/movies?upcoming=false"><p className="show-all">Visa alla</p></Link>
                </div>
                <div className="carousel">
                    {movies.map((movie, index) => (
                        <img 
                            key={index}
                            onClick={() => navigate(`/movies/${movie.id}`)}
                            className="carousel-img" 
                            src={`/images/${movie.id}_w200.webp`} 
                            srcSet={`/images/${movie.id}_w200.webp 200w, /images/${movie.id}_w400.webp 400w`} 
                            sizes="(max-width: 400px) 200px, 400px" 
                            alt="movie-poster"
                        />
                    ))}
                </div>
            </section>
            <section className="landingpage-card">
                <div className="landingpage-card-info">
                    <h4>Kommande</h4>
                    <Link to="/movies?upcoming=true"><p className="show-all">Visa alla</p></Link>
                </div>
                <div className="carousel">
                    {upcomingMovies.map((movie, index) => (
                        <img 
                            key={index}
                            onClick={() => navigate(`/movies/${movie.id}`)}
                            className="carousel-img" 
                            src={`/images/${movie.id}_w200.webp`} 
                            srcSet={`/images/${movie.id}_w200.webp 200w, /images/${movie.id}_w400.webp 400w`} 
                            sizes="(max-width: 400px) 200px, 400px" 
                            alt="movie-poster"
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}
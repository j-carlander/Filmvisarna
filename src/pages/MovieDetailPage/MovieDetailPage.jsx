import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { MovieDetailsInfo } from "../../components/MovieDetailsInfo/MovieDetailsInfo";

export function MovieDetailPage() {

  const { movieid } = useParams();
  const [ movies, setMovies ] = useState ([]);

    useEffect( () => {
      async function getMoviedetails() {
        const response = await fetchHelper(`/moviedetails/${movieid}`, "get")
        const data = await response.json()
        setMovies(data);
        console.log(data);
      }
      getMoviedetails()
    }, [])


  return (
    <>
      <section className="moviedetail-wrapper">
        {movies.map((movie, index) => <MovieDetailsInfo key={index} movie = {movie}/>)}
    </section>
    </>
    
  );
}

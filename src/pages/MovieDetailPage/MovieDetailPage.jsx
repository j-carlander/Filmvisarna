import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { MovieDetailsInfo } from "../../components/MovieDetailsInfo/MovieDetailsInfo";
import { MovieDetailsScreeningsByDate } from "../../components/MovieDetailsScreeningsByDate/MovieDetailsScreeningsByDate";
import { Loading } from "../../components/Loading/Loading";

export function MovieDetailPage() {
  const { movieid } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    async function getMoviedetails() {
      setLoading(true)
      const response = await fetchHelper(`/moviedetails/${movieid}`, "get");
      const data = await response.json();
      setMovies(data);
      setLoading(false)
    }
    getMoviedetails();
  }, [movieid]);

  const goBackToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
      {loading ? <Loading/> : 
      <div className="movieDetailsPage-container">
        <button className="imgbox" onClick={goBackToPreviousPage}>
          <img className="back-to-previous" src="/back-left-arrow.png" />
        </button>
        {movies.map((movie, index) => (
          <MovieDetailsInfo key={index} movie={movie} />
        ))}
        <MovieDetailsScreeningsByDate {...{ setMovies, movieid }} />
      </div>
      } 
    </>
  );
}

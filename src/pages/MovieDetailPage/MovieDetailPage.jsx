import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { MovieDetailsInfo } from "../../components/MovieDetailsInfo/MovieDetailsInfo";

export function MovieDetailPage() {
  const { movieid } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMoviedetails() {
      const response = await fetchHelper(`/moviedetails/${movieid}`, "get");
      const data = await response.json();
      setMovies(data);
      console.log(data);
    }
    getMoviedetails();
  }, [movieid]);

  const goBackToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="movieDetailsPage-container">
        <button className="imgbox" onClick={goBackToPreviousPage}>
          <img className="back-to-previous" src="/back-left-arrow.png" />
        </button>
        {movies.map((movie, index) => (
          <MovieDetailsInfo key={index} movie={movie} />
        ))}
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { Link } from "react-router-dom";
import { Carousel } from "../../components/Carousel/Carousel";

export function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const response = await fetchHelper("/movies?upcoming=false", "get");
      const data = await response.json();
      setMovies(data);
    }
    async function upComingMovies() {
      const response = await fetchHelper(`/movies?upcoming=true`, "get");
      const data = await response.json();
      setUpcomingMovies(data);
    }
    getMovies();
    upComingMovies();
  }, []);

  return (
    <div className="landingpage-container">
      <section className="landingpage-card">
        <div className="landingpage-card-info">
          <h4>På bio nu</h4>
          <Link to="/movies?upcoming=false">
            <p className="show-all">Visa alla</p>
          </Link>
        </div>
        <Carousel movies={movies} />
      </section>
      <section className="landingpage-card">
        <div className="landingpage-card-info">
          <h4>Kommande</h4>
          <Link to="/movies?upcoming=true">
            <p className="show-all">Visa alla</p>
          </Link>
        </div>
        <Carousel movies={upcomingMovies} />
      </section>
    </div>
  );
}

/**
 * Page for admin that lists all movies for the admin to pick which movie
 * they want to remove a screening for.
 */

import { useEffect } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { useState } from "react";

import { AdminMovieCard } from "../../components/AdminMovieCard/AdminMovieCard";
import { useNavigate } from "react-router-dom";

export function AdminMoviesPage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllMovies() {
      const url = `/movies`;
      const response = await fetchHelper(url, "get");
      const data = await response.json();
      setMovies(data);
    }
    getAllMovies();
  }, []);

  return (
    <div className="adminmovies-wrapper">
      <h2>Hantera filmer och visningar</h2>
      <p>
        Välj en film för att se aktuella visningar för den filmen och kunna
        lägga till och ta bort visningar
      </p>
      <button
        onClick={() => navigate("/admin/filmer/lagg-till-film")}
        className={"adminmovie-add-btn"}>
        Lägg till en film
      </button>
      <div className="adminmovies-grid">
        {movies.map((movie, index) => (
          <AdminMovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}

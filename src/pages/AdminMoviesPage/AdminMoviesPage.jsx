/**
 * Page for admin that lists all movies for the admin to pick which movie
 * they want to remove a screening for.
 */

import { useEffect } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { useState } from "react";

import { AdminMovieCard } from "../../components/AdminMovieCard/AdminMovieCard";

export function AdminMoviesPage() {
  const [movies, setMovies] = useState([]);

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
      <h2>Välj film för att visa visningar</h2>
      <div className="adminmovies-flex">
        {movies.map((movie, index) => (
          <AdminMovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}

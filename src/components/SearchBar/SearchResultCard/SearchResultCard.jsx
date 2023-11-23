/**
 * Component for searchresult in searchbar
 * SearchResultCard takes props and renders the searchresult 
 * information in a card format
 */

import { useNavigate } from "react-router-dom";

export function SearchResultCard({ movie, clearSearch, setShowMobileSearch }) {
  const navigate = useNavigate();

  const actors = movie.actors.join(", ");

  const categories = movie.categories.join(", ");
  return (
    <article
      className="search-result-card"
      onClick={() => {
        clearSearch();
        setShowMobileSearch(false);
        navigate(`/filmer/${movie.id}`);
      }}>
      <h3>{movie.title}</h3>
      <p>Regissör: {movie.director}</p>
      <p>Skådespelare: {actors}</p>
      <p>
        Kategori: {categories}
        {}
      </p>
    </article>
  );
}

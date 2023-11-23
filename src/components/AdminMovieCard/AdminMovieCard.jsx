/**
 * Component for displaying a button that navigates to a movie
 */

import { useNavigate } from "react-router-dom";

export function AdminMovieCard({ movie }) {
  const navigate = useNavigate();
  function navigateToScreenings() {
    navigate(`/admin/filmer/${movie.id}`, {
      state: { title: movie.title, ishidden: movie.ishidden },
    });
  }
  return (
    <div className="adminmoviecard-wrapper">
      <button className="adminmoviecard-btn" onClick={navigateToScreenings}>
        {movie.title}
      </button>
      {movie.ishidden ? <p className="adminmoviecard-hidden">DOLD</p> : null}
    </div>
  );
}

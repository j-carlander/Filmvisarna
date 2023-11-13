import { useNavigate } from "react-router-dom"

export function AdminMovieCard({ movie }) {
    const navigate = useNavigate();
    function navigateToScreenings() {
        navigate(`/admin/screenings/${movie.id}`)
    }
    return (
        <div className="adminmoviecard-wrapper">
            <button 
            className="adminmoviecard-btn"
            onClick={navigateToScreenings}>
                {movie.title}
            </button>
        </div>
    )
}
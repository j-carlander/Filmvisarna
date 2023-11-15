import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchHelper } from "../../utils/fetchHelper";
import { useState } from "react";
import { AdminScreeningCard } from "../../components/AdminScreeningCard/AdminScreeningCard";

export function AdminScreeningsPage() {
  const [screenings, setScreenings] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [page, setPage] = useState(0);
  const { movieid } = useParams();
  const location = useLocation();
  const { title } = location.state;
  function onMoreScreeningsClick() {
    setPage(page + 3);
  }

  useEffect(() => {
    async function getAllScreenings() {
      const url = `/moviescreenings/${movieid}?page=${page}`;
      const response = await fetchHelper(url, "get");
      const data = await response.json();
      if (response.status < 400) {
        if (page > 0) {
          setScreenings((old) => [...old, ...data]);
        } else {
          setScreenings(data);
        }
      } else {
        setServerError(data.error);
      }
    }
    getAllScreenings();
  }, [movieid, page]);

  const handleDeleteScreening = (deletedScreeningId) => {
    setScreenings((prevScreenings) =>
      prevScreenings.filter((screening) => screening.id !== deletedScreeningId)
    );

    setDeleteMessage("Visning tagits bort!");

    setTimeout(() => {
      setDeleteMessage("");
    }, 1500);
  };

  return (
    <div className="adminscreenings-wrapper">
      {screenings.map((screening, index) => (
        <AdminScreeningCard
          key={index}
          screening={screening}
          onDeleteScreening={handleDeleteScreening}
          movieTitle={title}
        />
      ))}
      {serverError === "" ? (
        <button onClick={onMoreScreeningsClick} className="more-screenings-btn">
          Hämta fler visningar
        </button>
      ) : (
        serverError !== "" && (
          <p className="no-more-screenings-text">
            Det finns inga fler visningar för denna film!
          </p>
        )
      )}
      {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
    </div>
  );
}

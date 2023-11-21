/**
 * Page for admin to add new screenings for a movie.
 */

import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchHelper } from "../../utils/fetchHelper";
import { useState } from "react";
import { AdminScreeningCard } from "../../components/AdminScreeningCard/AdminScreeningCard";
import { AdminPageBackBtn } from "../../components/AdminPageBackBtn/AdminPageBackBtn";

export function AdminScreeningsPage() {
  const [screenings, setScreenings] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [page, setPage] = useState(0);
  const { movieid } = useParams();
  const location = useLocation();
  const { title } = location.state;
  const navigate = useNavigate();

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
      <AdminPageBackBtn text={"Tillbaka till filmer"} />
      <h2>{title}</h2>
      {/* button/component hide movie */}
      <article className="adminscreenings-screenings">
        <h3>Hantera visningar</h3>
        <button
          onClick={() =>
            navigate("/admin/lagg-till-visning", {
              state: { movieid, title },
            })
          }
          className={"add-screenings-btn"}>
          Lägg till en visning
        </button>
        {screenings.map((screening, index) => (
          <AdminScreeningCard
            key={index}
            screening={screening}
            onDeleteScreening={handleDeleteScreening}
            movieTitle={title}
          />
        ))}
        {serverError === "" ? (
          <button
            onClick={onMoreScreeningsClick}
            className="more-screenings-btn">
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
      </article>
    </div>
  );
}

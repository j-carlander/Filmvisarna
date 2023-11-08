import { useState, useEffect } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import ScreeningsList from "../ScreeningList/ScreeningList";

export function MovieDetailsScreeningsByDate({ movieid }) {
  const [showScreening, setShowScreening] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [page, setPage] = useState(0);
  const [serverError, setServerError] = useState("");

  function dateInputChange(e) {
    const value = e.target.value;
    console.log(value);
    setPage(0);
    setServerError("");
    setFilterDate(value);
  }

  function onMoreScreeningsClick() {
    setPage(page + 3);
  }

  useEffect(() => {
    async function getScreeningsById() {
      console.log("Get screenings");
      const url =
        filterDate === ""
          ? `/moviescreenings/${movieid}?page=${page}`
          : `/screenings/${movieid}/${filterDate}`;
      const response = await fetchHelper(url, "get");
      const data = await response.json();
      if (response.status < 400) {
        console.log(page);
        if (page > 0) {
          setShowScreening((old) => [...old, ...data]);
        } else {
          setShowScreening(data);
        }
      } else {
        setServerError(data.error);
      }
    }

    getScreeningsById();
  }, [filterDate, movieid, page]);

  const currentDay = new Date().toLocaleDateString("se-SE");

  return (
    <div className="movie-screenings-container">
      <div className="date-wrapper">
        <label className="date-label">Datum</label>
        <input
          className="date-input"
          type="date"
          min={currentDay}
          onChange={dateInputChange}
        />
      </div>
      <div className="screenings-list">
        {showScreening.length === 0 ? (
          <p className="no-screening-para">
            Tyvärr finns det ingen visning för det valda datumet.
          </p>
        ) : (
          <ScreeningsList {...{ showScreening }} />
        )}
      </div>
      {serverError === "" && filterDate === "" ? (
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
    </div>
  );
}

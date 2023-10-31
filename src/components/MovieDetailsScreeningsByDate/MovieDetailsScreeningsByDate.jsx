import { useState, useEffect } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import ScreeningsList from "../ScreeningList/ScreeningList";

export function MovieDetailsScreeningsByDate({ movieid }) {
  const [ showScreening, setShowScreening ] = useState([]);
  const [filterDate, setFilterDate] = useState("");


  function dateInputChange(e) {
    const value = e.target.value;
    setFilterDate(value)
  }

  useEffect(() => {
    async function getScreeningsById() {
      const url = filterDate === "" ? `/moviescreenings/${movieid}` : `/screenings/${movieid}/${filterDate}`;
      const response = await fetchHelper(url, "get");
      const data = await response.json();
      setShowScreening(data);
    }

    getScreeningsById();
  }, [filterDate, movieid, showScreening]);





    return (
      <div className="movie-screenings-container">
        <div className="date-wrapper">
          <label className="date-label">Datum</label>
          <input
            className="date-input"
            type="date"
            onChange={dateInputChange}
          />
        </div>
        <div className="screenings-list">
          {showScreening.length === 0 ? (
            <p>nothing to show</p> 
            ) : (
            <ScreeningsList {...{ showScreening }}/>
          )}
        </div>
      </div>
        
    )
}
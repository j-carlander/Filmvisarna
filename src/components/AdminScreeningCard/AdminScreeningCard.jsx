import { useState } from "react";
import { formatStringWithFirstCharToUpper } from "../../utils/formatStringWithFirstCharToUpper";
import { fetchHelper } from "../../utils/fetchHelper";

export function AdminScreeningCard({ screening, onDeleteScreening }) {
  const [message, setMessage] = useState("");

  async function deleteScreening() {
    const url = `/removescreening/${screening.id}`;
    const response = await fetchHelper(url, "delete");
    const data = await response.json();
    console.log(response)
    if (response.status < 400) {
      setMessage(data.message);
      onDeleteScreening(screening.id);
    } else {
      setMessage(data.error)
    }
  }

  return (
      <article className="adminscreening-details">
      <div className="adminscreening-left">
        <div className="adminscreening-flex-wrap">
          <h3 className="adminscreening-time">{screening.screeningDate} </h3>
          <p className="adminscreening-theatre">{screening.theatre}</p>
        </div>
        <p className="adminscreening-lang">
          ({formatStringWithFirstCharToUpper(screening.language)} tal,{" "}
          {formatStringWithFirstCharToUpper(screening.subtitle)} text)
        </p>
      </div>
      <div className="adminscreening-right">
        <button className="adminscreening-book-btn" onClick={deleteScreening}>
          Ta Bort
        </button>
        <p className="adminscreening-seats">Platser lediga: {screening.freeSeats}</p>
        <p>{message}</p>
      </div>
    </article>
  )
}
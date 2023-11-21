/**
 * Component for displaying and removing a screening
 * deleteScreening sends a fetch request to remove a screening from the database
 * updates front-end on success
 */

import { formatStringWithFirstCharToUpper } from "../../utils/formatStringWithFirstCharToUpper";
import { fetchHelper } from "../../utils/fetchHelper";
import { useRef } from "react";

export function AdminScreeningCard({
  screening,
  onDeleteScreening,
  movieTitle,
}) {
  const dialogRef = useRef();

  async function deleteScreening() {
    const url = `/removescreening/${screening.id}`;
    const response = await fetchHelper(url, "delete");
    if (response.status < 400) {
      onDeleteScreening(screening.id);
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
        <button
          className="adminscreening-book-btn"
          onClick={() => dialogRef.current.showModal()}>
          Ta Bort
        </button>
        <p className="adminscreening-seats">
          Platser lediga: {screening.freeSeats}
        </p>
      </div>
      <dialog ref={dialogRef} className="adminscreening-dialog">
        <p>Är du säker på att du vill ta bort visningen för</p>
        <p>{movieTitle}</p>
        <p>{screening.screeningDate}</p>
        <button onClick={deleteScreening} className="adminscreening-book-btn">
          Ta Bort
        </button>
        <button
          className="more-screenings-btn"
          onClick={() => dialogRef.current.close()}>
          Avbryt
        </button>
      </dialog>
    </article>
  );
}

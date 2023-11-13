import { formatStringWithFirstCharToUpper } from "../../utils/formatStringWithFirstCharToUpper";

export function AdminScreeningCard({ screening }) {
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
          <button className="adminscreening-book-btn">
            Ta Bort
          </button>
          <p className="adminscreening-seats">Platser lediga: {screening.freeSeats}</p>
        </div>
      </article>
    )
}
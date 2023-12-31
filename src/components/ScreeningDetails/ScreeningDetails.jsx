/**
 * Component for screening details
 * ScreeningDetails takes a prop and renders the screening 
 * information in a card format
 */

import { useNavigate } from "react-router-dom";
import { formatStringWithFirstCharToUpper } from "../../utils/formatStringWithFirstCharToUpper";

export function ScreeningDetails({ screening }) {
  const navigate = useNavigate();
  return (
    <article className="screening-details">
      <div className="details-left">
        <div className="details-flex-wrap">
          <h3 className="screening-time">{screening.screeningDate} </h3>
          <p className="screening-theatre">{screening.theatre}</p>
        </div>
        <p className="screening-lang">
          ({formatStringWithFirstCharToUpper(screening.language)} tal,{" "}
          {formatStringWithFirstCharToUpper(screening.subtitle)} text)
        </p>
      </div>
      <div className="details-right">
        <button
          className="screening-book-btn"
          onClick={() => {
            navigate(`/bokning/${screening.id}`);
          }}>
          Boka
        </button>
        <p className="screening-seats">Platser lediga: {screening.freeSeats}</p>
      </div>
    </article>
  );
}

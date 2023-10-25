import { useState, useEffect } from "react";
import Seat from "./Seat/Seat";
import SeatRow from "./Seatrow/SeatRow";
import { fetchHelper } from "../../utils/fetchHelper";

export default function Seats({ theatreId }) {
  const [seats, setSeats] = useState([]);

  function getSeatRow(rowInfo, index) {
    const seats = [];

    for (let i = 0; i < rowInfo.numberofseats; i++) {
      seats.push(<Seat key={`row-${index}-seat-${i + 1}`} />);
    }

    return <SeatRow key={`row-${index}`} seats={seats} />;
  }

  useEffect(() => {
    async function getThetreLayout() {
      const response = await fetchHelper(`/theatrerows/${theatreId}`, "get");
      const theatreData = await response.json();
      setSeats(theatreData);
    }

    getThetreLayout();
  }, [theatreId]);

  return (
    <div className="theatre-container">
      <svg
        className="theatre-screen"
        fill="none"
        viewBox="0 0 50 10"
        preserveAspectRatio="xMinYMin meet">
        <path d="M0 0 L6 10 L44 10 L50 0 Z" strokeWidth={1} />
      </svg>
      <div className="theatre-wrapper">
        <div className="theatre-seats">{seats.map(getSeatRow)}</div>
      </div>
    </div>
  );
}

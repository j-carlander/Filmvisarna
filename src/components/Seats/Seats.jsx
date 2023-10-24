import { useState } from "react";
import Seat from "./Seat/Seat";
import SeatRow from "./Seatrow/SeatRow";

const mockSeats = [
  {
    rownumber: 1,
    numberofseats: 6,
  },
  {
    rownumber: 2,
    numberofseats: 8,
  },
  {
    rownumber: 3,
    numberofseats: 9,
  },
  {
    rownumber: 4,
    numberofseats: 10,
  },
  {
    rownumber: 5,
    numberofseats: 10,
  },
  {
    rownumber: 6,
    numberofseats: 12,
  },
];

export default function Seats() {
  const [seats, setSeats] = useState(mockSeats);

  function getSeatRow(rowInfo, index) {
    const seats = [];

    for (let i = 0; i < rowInfo.numberofseats; i++) {
      seats.push(<Seat key={`row-${index}-seat-${i + 1}`} />);
    }

    return <SeatRow key={`row-${index}`} seats={seats} />;
  }

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

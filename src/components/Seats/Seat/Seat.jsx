import { useState, useEffect } from "react";

export default function Seat({ takenSeats, rowNumber, seatNumber }) {
  const [classNames, setClassnames] = useState("seat");

  useEffect(() => {
    const thisTakenSeat = takenSeats.find(
      (el) => el.seatrow === rowNumber && el.seatnumber === seatNumber
    );

    setClassnames(`seat${thisTakenSeat ? " taken-seat" : ""}`);
  }, [takenSeats, rowNumber, seatNumber, setClassnames]);

  return <div className={classNames}></div>;
}

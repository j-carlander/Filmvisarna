import { useState, useEffect } from "react";

export default function Seat({
  takenSeats,
  rowNumber,
  seatNumber,
  setSelectedSeats,
  selectedSeats,
  totalTickets,
  seats,
}) {
  const [classNames, setClassnames] = useState("seat");

  function onClick() {
    if (totalTickets === 0) return;
    const row = seats.find((el) => el.rownumber === rowNumber);
    console.log(row);

    if (seatNumber - totalTickets + 1 <= 0) return;
    const filteredTakenSeats = takenSeats.filter(
      (el) => el.seatrow === row.rownumber
    );
    for (let i = 0; i < totalTickets; i++) {
      const seat = filteredTakenSeats.find(
        (el) => el.seatnumber === seatNumber - i
      );
      if (seat) return;
    }
    setSelectedSeats([{ rowNumber, seatNumber }]);
  }

  useEffect(() => {
    const thisTakenSeat = takenSeats.find(
      (el) => el.seatrow === rowNumber && el.seatnumber === seatNumber
    );

    let selected = selectedSeats.find(
      (el) => el.rowNumber === rowNumber && el.seatNumber === seatNumber
    );

    if (!selected && selectedSeats.length > 0) {
      for (let i = 0; i < totalTickets; i++) {
        if (
          selectedSeats[0].rowNumber === rowNumber &&
          selectedSeats[0].seatNumber - i === seatNumber
        ) {
          selected = true;
          const foundSeats = selectedSeats.find(
            (value) =>
              value.rowNumber === rowNumber && value.seatNumber === seatNumber
          );
          if (foundSeats === undefined) {
            setSelectedSeats([...selectedSeats, { rowNumber, seatNumber }]);
          }
        }
      }
    }

    setClassnames(
      `seat${thisTakenSeat ? " taken-seat" : ""}${
        selected ? " selected-seat" : ""
      }`
    );
  }, [
    takenSeats,
    rowNumber,
    seatNumber,
    setClassnames,
    selectedSeats,
    totalTickets,
    setSelectedSeats,
  ]);

  return <div className={classNames} onClick={onClick}></div>;
}

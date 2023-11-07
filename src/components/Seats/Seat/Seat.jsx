import { useState, useEffect } from "react";

export default function Seat({
  takenSeats,
  rowNumber,
  seatNumber,
  setSelectedSeats,
  selectedSeats,
  totalTickets,
  seats,
  individual,
}) {
  const [classNames, setClassnames] = useState("seat");

  function onClick() {
    if (totalTickets === 0) return;

    const row = seats.find((el) => el.rownumber === rowNumber);

    if (!individual && seatNumber - totalTickets + 1 <= 0) return;
    const filteredTakenSeats = takenSeats.filter(
      (el) => el.seatrow === row.rownumber
    );
    const max = individual ? 1 : totalTickets;
    for (let i = 0; i < max; i++) {
      const seat = filteredTakenSeats.find(
        (el) => el.seatnumber === seatNumber - i
      );
      if (seat) return;
    }
    if (individual) {
      const thisSeat = selectedSeats.find(
        (seat) => seat.rowNumber === rowNumber && seat.seatNumber === seatNumber
      );
      if (thisSeat) return;
      setSelectedSeats((old) => {
        if (old !== undefined && old.length === totalTickets) {
          old.splice(0, 1);
        }

        return [...old, { rowNumber, seatNumber }];
      });
      return;
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

    if (!selected && selectedSeats.length > 0 && !individual) {
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
    individual,
  ]);

  return <div className={classNames} onClick={onClick}></div>;
}

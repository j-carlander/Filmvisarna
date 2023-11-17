import { useEffect, useState } from "react";

export function useSeatHook({
  takenSeats,
  rowNumber,
  seatNumber,
  selectedSeats,
  totalTickets,
  setSelectedSeats,
  individual,
  hoveredSeat,
  clickedSeatNumber,
}) {
  const [classNames, setClassnames] = useState("seat");
  useEffect(() => {
    const thisTakenSeat = takenSeats.find(
      (el) => el.seatrow === rowNumber && el.seatnumber === seatNumber
    );

    let selected = selectedSeats.find(
      (el) => el.rowNumber === rowNumber && el.seatNumber === seatNumber
    );

    if (
      !thisTakenSeat &&
      !selected &&
      selectedSeats.length > 0 &&
      !individual
    ) {
      for (let i = 0; i < totalTickets; i++) {
        if (clickedSeatNumber - i === 0) {
          for (
            let j = 0;
            j < totalTickets && selectedSeats.length < totalTickets;
            j++
          ) {
            if (
              selectedSeats[0].rowNumber === rowNumber &&
              selectedSeats[0].seatNumber + j === seatNumber &&
              selectedSeats[0].seatNumber + 1 === seatNumber
            ) {
              selected = true;
              const foundSeats = selectedSeats.find(
                (value) =>
                  value.rowNumber === rowNumber &&
                  value.seatNumber === seatNumber
              );
              if (foundSeats === undefined) {
                const sortedList = [
                  ...selectedSeats,
                  { rowNumber, seatNumber },
                ];

                sortedList.sort((a, b) => b.seatNumber - a.seatNumber);

                setSelectedSeats(sortedList);
              }
            }
          }
          break;
        } else {
          if (
            selectedSeats[0].rowNumber === rowNumber &&
            selectedSeats[0].seatNumber - i === seatNumber &&
            selectedSeats[selectedSeats.length - 1].seatNumber - 1 ===
              seatNumber
          ) {
            selected = true;
            const foundSeats = selectedSeats.find(
              (value) =>
                value.rowNumber === rowNumber && value.seatNumber === seatNumber
            );
            if (foundSeats === undefined) {
              const sortedList = [...selectedSeats, { rowNumber, seatNumber }];

              sortedList.sort((a, b) => b.seatNumber - a.seatNumber);

              setSelectedSeats(sortedList);
            }
          }
        }
      }
    }

    let hover = false,
      hoverFail = false;

    if (individual && hoveredSeat !== undefined) {
      if (
        hoveredSeat.rowNumber === rowNumber &&
        hoveredSeat.seatNumber === seatNumber
      ) {
        if (thisTakenSeat) {
          hoverFail = true;
        } else {
          hover = true;
        }
      }
    }

    if (!individual && hoveredSeat !== undefined) {
      for (let i = 0; i < totalTickets; i++) {
        if (hoveredSeat.seatNumber - i === 0) {
          for (let j = 0; j <= totalTickets - i; j++) {
            if (
              hoveredSeat.rowNumber === rowNumber &&
              hoveredSeat.seatNumber + j === seatNumber
            ) {
              if (thisTakenSeat) {
                hoverFail = true;
              } else {
                hover = true;
              }
            }
          }
          break;
        } else {
          if (
            hoveredSeat.rowNumber === rowNumber &&
            hoveredSeat.seatNumber - i === seatNumber
          ) {
            if (thisTakenSeat) {
              hoverFail = true;
            } else {
              hover = true;
            }
          }
        }
      }
    }

    setClassnames(
      `seat${thisTakenSeat ? " taken-seat" : ""}${
        selected ? " selected-seat" : ""
      }${hover ? " seat-hover" : ""}${hoverFail ? " seat-hover-fail" : ""}`
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
    hoveredSeat,
    clickedSeatNumber,
  ]);

  return [classNames];
}

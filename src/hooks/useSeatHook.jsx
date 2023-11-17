import { useEffect, useState } from "react";
import useSeatHoverHook from "./useSeatHoverHook";

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
  const [hover, hoverFail] = useSeatHoverHook({
    rowNumber,
    seatNumber,
    totalTickets,
    individual,
    hoveredSeat,
    takenSeats,
  });

  useEffect(() => {
    function addThisSeat() {
      const sortedList = [...selectedSeats, { rowNumber, seatNumber }];

      sortedList.sort((a, b) => b.seatNumber - a.seatNumber);

      setSelectedSeats(sortedList);
    }

    function findThisSeat(list) {
      return list.find(
        (value) =>
          (value.rowNumber === rowNumber && value.seatNumber === seatNumber) ||
          (value.seatrow === rowNumber && value.seatnumber === seatNumber)
      );
    }

    const thisTakenSeat = findThisSeat(takenSeats);

    let selected = findThisSeat(selectedSeats);

    function checkSelectedCondition(condition) {
      if (selectedSeats[0].rowNumber === rowNumber && condition) {
        selected = true;
        const foundSeats = findThisSeat(selectedSeats);
        if (foundSeats === undefined) {
          addThisSeat();
        }
      }
    }

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
            checkSelectedCondition(
              selectedSeats[0].seatNumber + j === seatNumber &&
                selectedSeats[0].seatNumber + 1 === seatNumber
            );
          }
          break;
        } else {
          checkSelectedCondition(
            selectedSeats[0].seatNumber - i === seatNumber &&
              selectedSeats[selectedSeats.length - 1].seatNumber - 1 ===
                seatNumber
          );
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
    hover,
    hoverFail,
  ]);

  return [classNames];
}

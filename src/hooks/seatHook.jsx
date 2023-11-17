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

    let hover = false,
      hoverFail = false;

    function checkHoverCondition(condition) {
      if (hoveredSeat.rowNumber === rowNumber && condition) {
        if (thisTakenSeat) {
          hoverFail = true;
        } else {
          hover = true;
        }
      }
    }

    if (individual && hoveredSeat !== undefined) {
      checkHoverCondition(hoveredSeat.seatNumber === seatNumber);
    }

    if (!individual && hoveredSeat !== undefined) {
      for (let i = 0; i < totalTickets; i++) {
        if (hoveredSeat.seatNumber - i === 0) {
          for (let j = 0; j <= totalTickets - i; j++) {
            checkHoverCondition(hoveredSeat.seatNumber + j === seatNumber);
          }
          break;
        } else {
          checkHoverCondition(hoveredSeat.seatNumber - i === seatNumber);
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

/**
 * Hook for checking if seat is being hovered or not for grouped seats.
 */

import { useEffect, useState } from "react";

export default function useSeatHoverHook({
  rowNumber,
  seatNumber,
  totalTickets,
  individual,
  hoveredSeat,
  takenSeats,
}) {
  const [hover, setHover] = useState(false);
  const [hoverFail, setHoverFail] = useState(false);
  useEffect(() => {
    setHover(false);
    setHoverFail(false);

    const thisTakenSeat = takenSeats.find(
      (value) => value.seatrow === rowNumber && value.seatnumber === seatNumber
    );

    function checkHoverCondition(condition) {
      if (hoveredSeat.rowNumber === rowNumber && condition) {
        if (thisTakenSeat) {
          setHoverFail(true);
        } else {
          setHover(true);
        }
      }
    }

    if (individual && hoveredSeat !== undefined) {
      checkHoverCondition(hoveredSeat.seatNumber === seatNumber);
    }

    let reverse = false;

    if (!individual && hoveredSeat !== undefined) {
      for (let i = 0; i < totalTickets; i++) {
        if (hoveredSeat.seatNumber - i === 0 || reverse) {
          for (let j = 0; j <= totalTickets - i; j++) {
            checkHoverCondition(hoveredSeat.seatNumber + j === seatNumber);
          }
          break;
        } else {
          const takenSeatCheck = takenSeats.find(
            (seat) =>
              seat.seatrow === rowNumber &&
              seat.seatnumber === hoveredSeat.seatNumber - i
          );
          if (takenSeatCheck !== undefined) {
            i--;
            reverse = true;
          } else {
            checkHoverCondition(hoveredSeat.seatNumber - i === seatNumber);
          }
        }
      }
    }
  }, [
    setHover,
    setHoverFail,
    rowNumber,
    seatNumber,
    totalTickets,
    individual,
    hoveredSeat,
    takenSeats,
  ]);

  return [hover, hoverFail];
}

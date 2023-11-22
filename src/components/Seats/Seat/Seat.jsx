/**
 * Component for an individual seat in a theater.
 * It handles seat selection logic, considers the total number of tickets,
 * the useSeatHook hook managing class names based on different conditions.
 */

import { useSeatHook } from "../../../hooks/useSeatHook";

export default function Seat({
  takenSeats,
  rowNumber,
  seatNumber,
  setSelectedSeats,
  selectedSeats,
  totalTickets,
  seats,
  individual,
  hoveredSeat,
  setHoveredSeat,
  clickedSeatNumber,
  setClickedSeatNumber,
}) {
  const [classNames] = useSeatHook({
    takenSeats,
    rowNumber,
    seatNumber,
    selectedSeats,
    totalTickets,
    setSelectedSeats,
    individual,
    hoveredSeat,
    clickedSeatNumber,
  });

  function isOtherSeatTaken(seatsArray, condition) {
    const seat = seatsArray.find((el) => el.seatnumber === condition);
    if (seat !== undefined) {
      return true;
    }
  }

  function isSeatTaken() {
    const row = seats.find((el) => el.rownumber === rowNumber);

    const filteredTakenSeats = takenSeats.filter(
      (el) => el.seatrow === row.rownumber
    );
    const max = individual ? 1 : totalTickets;
    let foundRightTakenSeat = false;
    for (let i = 0; i < max; i++) {
      if (seatNumber - i === 0 || foundRightTakenSeat) {
        for (let j = 0; j < max && j <= max - i; j++) {
          if (isOtherSeatTaken(filteredTakenSeats, seatNumber + j)) {
            return true;
          }
        }
        break;
      }
      if (isOtherSeatTaken(filteredTakenSeats, seatNumber - i)) {
        i--;
        foundRightTakenSeat = true;
      }
    }

    return false;
  }

  function trySelectSeat() {
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
  }

  function onClick() {
    if (totalTickets === 0 || isSeatTaken()) return;

    if (individual) {
      trySelectSeat();
      return;
    }
    setClickedSeatNumber(seatNumber);
    setSelectedSeats([{ rowNumber, seatNumber }]);
  }

  return (
    <div
      className={classNames}
      onMouseEnter={() => setHoveredSeat({ rowNumber, seatNumber })}
      onMouseLeave={() => setHoveredSeat(undefined)}
      onClick={onClick}></div>
  );
}

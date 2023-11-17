import { useSeatHook } from "../../../hooks/seatHook";

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

  function onClick() {
    if (totalTickets === 0) return;

    const row = seats.find((el) => el.rownumber === rowNumber);

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

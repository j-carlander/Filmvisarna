import { checkSeatsOnSameRow } from "./checkSeatsOnSameRow.js";

export function formatSeatInfo(seats) {
  if (seats.length === 0) return "";
  const onSameRow = checkSeatsOnSameRow(seats);

  if (onSameRow) {
    const seatNumbers =
      seats.length === 1
        ? seats[0].seatNumber
        : `${seats[0].seatNumber} - ${seats[seats.length - 1].seatNumber}`;

    return `Rad: ${seats[0].seatRow} Plats: ${seatNumbers}`;
  } else {
    return seats
      .sort((a, b) => a.seatRow - b.seatRow)
      .map((seat) => `Rad: ${seat.seatRow} Plats: ${seat.seatNumber}`)
      .join(", ");
  }
}

export function formatSeatInfo(seats) {
  if (seats.length === 0) return "";

  const seatNumbers =
    seats.length === 1
      ? seats[0].seatNumber
      : `${seats[0].seatNumber} - ${seats[seats.length - 1].seatNumber}`;

  return `Rad: ${seats[0].seatRow}, Plats: ${seatNumbers}`;
}

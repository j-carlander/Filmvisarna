/**
 * Util for checking if the seats a user is booking are grouped together.
 */

export function checkSeatsGroupedTogether(seats) {
  let groupedTogether = true;

  const sortedSeats = [...seats].sort((a, b) => a.seatNumber - b.seatNumber);

  let checkNumber = sortedSeats[0].seatNumber;

  for (let i = 0; i < sortedSeats.length; i++) {
    if (sortedSeats[i].seatNumber !== checkNumber) {
      return false;
    }
    checkNumber++;
  }

  return groupedTogether;
}

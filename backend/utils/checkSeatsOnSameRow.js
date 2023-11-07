export function checkSeatsOnSameRow(seats) {
  let onSameRow = true;
  for (let i = 0; i < seats.length; i++) {
    if (seats[i].seatRow !== seats[0].seatRow) {
      onSameRow = false;
      break;
    }
  }
  return onSameRow;
}

/**
 * Util for formatting seats for booking confirmation based on if the seats selected
 * are individual or grouped.
 */

export function formatSeatsForBookingConf(individual, selectedSeats) {
  if (individual) {
    return selectedSeats.map((seat, index) => (
      <span key={`seat-${index}`}>
        Rad: {seat.rowNumber} plats: {seat.seatNumber}
      </span>
    ));
  } else {
    return ` rad ${selectedSeats[0].rowNumber} plats 
        ${
          selectedSeats.length === 1
            ? selectedSeats[0].seatNumber
            : `${selectedSeats[selectedSeats.length - 1].seatNumber} - ${
                selectedSeats[0].seatNumber
              }`
        }`;
  }
}

/**
 * Util for checking seats if they reference the same seat.
 */

export function compareSeats(obj1, obj2) {
  return obj1.seatrow == obj2.seatrow && obj1.seatnumber == obj2.seatnumber;
}

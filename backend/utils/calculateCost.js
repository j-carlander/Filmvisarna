/**
 * Util for calculating total cost for all tickets.
 */

export function calculateCost(seats, ticketType) {
  return seats.reduce((tot, seat) => {
    tot += ticketType.find(({ id }) => id === seat.ticketType).price;
    return tot;
  }, 0);
}

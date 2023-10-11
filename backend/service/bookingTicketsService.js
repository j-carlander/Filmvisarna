import { runQuery } from "../db";

export function bookingTickets(
  seatrow,
  seatnumber,
  tickettypeid,
  screeningid,
  bookingid
) {
  const ticketQuery =
    "INSERT INTO tickets(seatrow, seatnumber,tickettypeid, screeningid, bookingid) VALUES(?, ?, ?, ?)";

  runQuery(ticketQuery, [
    seatrow,
    seatnumber,
    tickettypeid,
    screeningid,
    bookingid,
  ]);
}

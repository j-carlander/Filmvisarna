import { runQuery } from "../db";

export function bookingTickets(seatrow, seatnumber, tickettypeid, screeningid) {
  const ticketQuery =
    "INSERT INTO tickets(seatrow, seatnumber,tickettypeid, screeningid) VALUES(?, ?, ?, ?)";

  runQuery(ticketQuery, [seatrow, seatnumber, tickettypeid, screeningid]);
}

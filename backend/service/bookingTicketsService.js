import { runQuery } from "../db.js";

export async function bookingTickets(
  seatrow,
  seatnumber,
  tickettypeid,
  screeningid,
  bookingid
) {
  const ticketQuery =
    "INSERT INTO tickets(seatrow, seatnumber,tickettypeid, screeningid, bookingid) VALUES(?, ?, ?, ?, ? )";

  return await runQuery(ticketQuery, [
    seatrow,
    seatnumber,
    tickettypeid,
    screeningid,
    bookingid,
  ]);
}

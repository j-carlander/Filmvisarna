/**
 * A middleware for retrieving the seats for a booking on a request to delete tha booking
 * if no booking was found, aborts the request and responds with a status 404 and a message in Swedish that the booking was not found
 * if booking was found, saves the seats in the response.locals variable to be retrieved in next step
 */

import { getSeatsForDeletionService } from "../service/deleteBookingService.js";

export async function checkSeatsForDeletion(req, res, next) {
  const { bookingnumber } = req.body;
  const result = await getSeatsForDeletionService(bookingnumber);

  if (result.length === 0) {
    return res.status(404).json({ error: "Ogiltigt bokningsnummer!" });
  }
  const seats = result.map((seat) => ({
    rowNumber: seat.seatrow,
    seatNumber: seat.seatnumber,
  }));
  const screeningId = result[0].screeningid;
  res.locals = { ...res.locals, seats, screeningId };
  next();
}

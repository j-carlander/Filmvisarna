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

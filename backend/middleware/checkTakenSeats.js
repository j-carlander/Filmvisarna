import { takenseatsService } from "../service/takenseatsService.js";

export async function checkSeatsTaken(req, res, next) {
    const { screeningid } = req.params;
    const { seats } = req.body;

    const bookedSeats = await takenseatsService(screeningid);
  
    for (const seat of seats) {
      if (bookedSeats.some(bookedSeat => bookedSeat.seatrow === seat.seatRow && bookedSeat.seatnumber === seat.seatNumber)) {
        return res.status(404).send(`Seat ${seat.seatNumber} in row ${seat.seatRow} is already booked.`);
      }
    }
    next();
}
  
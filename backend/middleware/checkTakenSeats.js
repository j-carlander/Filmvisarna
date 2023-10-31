import { takenseatsService } from "../service/takenseatsService.js";

export async function checkSeatsTaken(req, res, next) {
  const { screeningid } = req.params;
  const { seats } = req.body;

  const bookedSeats = await takenseatsService(screeningid);

  for (const seat of seats) {
    if (
      bookedSeats.some(
        (bookedSeat) =>
          bookedSeat.seatrow === seat.seatRow &&
          bookedSeat.seatnumber === seat.seatNumber
      )
    ) {
      return res
        .status(404)
        .json({
          error: `Stolen: ${seat.seatNumber} på rad: ${seat.seatRow} är upptagen!`,
        });
    }
  }
  next();
}

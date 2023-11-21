/**
 * A middleware for checking that the seats sent with a booking request for a particular screening are available in the salon and of expected type and format
 * if not, aborts the request and responds with a status 400 and a message in Swedish that the seatnumber don't exist on that row
 */

import { checkTotalSeatsForRow } from "../service/getTotalSeats.js";

export async function checkSeatExists(req, res, next) {
  try {
    const { screeningid } = req.params;
    const { seats } = req.body;

    for (const seat of seats) {
      const { seatRow, seatNumber } = seat;

      // Check if seatNumber is within the valid range for the given seatRow
      const totalSeatsForRow = await checkTotalSeatsForRow(
        screeningid,
        seatRow
      );

      if (seatNumber < 1 || seatNumber > totalSeatsForRow) {
        return res
          .status(400)
          .json({ error: `Ogiltigt sätesnummer för rad: ${seatRow}` });
      }
    }

    // All seats are valid
    next();
  } catch (error) {
    console.error("Error in checkSeatExists middleware:", error);
    res.status(500).json({ error: "Internt server fel!" });
  }
}

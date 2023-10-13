import { bookingNumberService } from "../service/bookingNumberService.js";
import { bookingTickets } from "../service/bookingTicketsService.js";
import { bookingservice } from "../service/bookingservice.js";

export async function addBooking(req, res) {
  const { seats, guestEmail, guestPhone } = req.body;
  const screeningid = req.params.screeningid;
  const bookingNumber = await bookingNumberService();

  // Check if a user is logged in and get their user ID from req.user
  const userid = req.user ? req.user.id : null;

  // Create the booking in the database
  const bookResult = await bookingservice(bookingNumber, screeningid, guestEmail, guestPhone, userid);

  // Insert tickets for the booking
  const ticketPromises = seats.map(async (seat) => {
    await bookingTickets (
        seat.seatRow, 
        seat.seatNumber, 
        1, 
        screeningid,
        bookResult.insertId);
  });

  // Wait for all ticket insertions to complete
  await Promise.all(ticketPromises);

  const bookingDetails = {
    seats: seats,
    guestEmail: guestEmail,
    guestPhone: guestPhone,
    bookingNumber: bookingNumber,
  };

  res.status(201).json(bookingDetails);
}

import { bookingNumberService } from "../service/bookingNumberService.js";
import { bookingTickets } from "../service/bookingTicketsService.js";
import { bookingservice } from "../service/bookingservice.js";

export async function addBooking(req, res) {
  const { seats, guestEmail, guestPhone } = req.body;
  const screeningid = req.params.screeningid;
  const bookingNumber = await bookingNumberService();

  const userid = req.user ? req.user.id : null;

  const bookResult = await bookingservice (
    bookingNumber, 
    screeningid, 
    guestEmail, 
    guestPhone, 
    userid);

  const ticketPromises = seats.map(async (seat) => {
    await bookingTickets (
      seat.seatRow, 
      seat.seatNumber, 
      1, 
      screeningid,
      bookResult.insertId);
  });

  await Promise.all(ticketPromises);

  const bookingDetails = {
    seats: seats,
    guestEmail: guestEmail,
    guestPhone: guestPhone,
    bookingNumber: bookingNumber,
    userid: userid,
  };

  res.status(201).json(bookingDetails);
}

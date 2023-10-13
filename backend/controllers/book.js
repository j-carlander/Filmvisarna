import { bookingNumberService } from "../service/bookingNumberService.js";
import { bookingTickets } from "../service/bookingTicketsService.js";
import { bookingservice } from "../service/bookingservice.js";
import { tickettypeService } from "../service/tickettypeService.js";

export async function addBooking(req, res) {
  const { seats, guestEmail, guestPhone } = req.body;
  const screeningid = req.params.screeningid;
  const bookingNumber = await bookingNumberService();
  const ticketType = await tickettypeService();
  const bookResult = await bookingservice(
    bookingNumber,
    screeningid,
    guestEmail,
    guestPhone
  );
  console.log(bookResult.insertId);

  const ticketresult = await seats.map(async (seat) => {
    await bookingTickets(
      seat.seatRow,
      seat.seatNumber,
      ticketType.find(({ id }) => id === seat.ticketType).id,
      screeningid,
      bookResult.insertId
    );
  });

  console.log(ticketresult);

  const bookingDetails = {
    seats: seats,
    tickets: ticketType,
    guestEmail: guestEmail,
    guestPhone: guestPhone,
    bookingNumber: bookingNumber,
  };

  res.status(201).json(bookingDetails);
}

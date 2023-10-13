import { bookingNumberService } from "../service/bookingNumberService.js";
import { bookingTickets } from "../service/bookingTicketsService.js";
import {
  bookingservice,
  getBookingsByUserId,
} from "../service/bookingservice.js";

export async function addBooking(req, res) {
  const { seats, guestEmail, guestPhone } = req.body;
  const screeningid = req.params.screeningid;
  const bookingNumber = await bookingNumberService();
  const bookResult = await bookingservice(
    bookingNumber,
    screeningid,
    guestEmail,
    guestPhone
  );
  console.log(bookResult.insertId);

  const ticketresult = await seats.forEach(async (seat) => {
    await bookingTickets(
      seat.seatRow,
      seat.seatNumber,
      1,
      screeningid,
      bookResult.insertId
    );
  });

  console.log(ticketresult);

  // bookingTickets(
  //     seatrow,
  //     seatnumber,
  //     tickettypeid,
  //     screeningid,
  //     bookingid
  // )

  const bookingDetails = {
    seats: seats,
    guestEmail: guestEmail,
    guestPhone: guestPhone,
    bookingNumber: bookingNumber,
  };

  res.status(201).json(bookingDetails);
}

export async function getBookings(req, res) {
  const { jwtPayload } = res.locals;

  const bookings = await getBookingsByUserId(jwtPayload.id);

  res.send(bookings);
}

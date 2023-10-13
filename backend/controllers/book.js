import { bookingNumberService } from "../service/bookingNumberService.js";
import { bookingTickets } from "../service/bookingTicketsService.js";
import { tickettypeService } from "../service/tickettypeService.js";
import {
  bookingservice,
  getBookingsByUserId,
} from "../service/bookingservice.js";
import { bookingConfirmationMailService } from "../service/bookingConfirmationMailService.js";
import { screeningsService } from "../service/screeningsService.js";
import { getMovieDetails } from "../service/moviedetailsService.js";

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
    guestEmail: guestEmail,
    guestPhone: guestPhone,
    bookingNumber: bookingNumber,
  };

  const screening = await screeningsService(screeningid);
  const { date, movieid } = screening[0];

  const movie = await getMovieDetails(movieid);
  const { title } = movie[0];

  await bookingConfirmationMailService(
    guestEmail,
    title,
    date,
    seats,
    bookingNumber
  );

  res.status(201).json(bookingDetails);
}

export async function getBookings(req, res) {
  const { jwtPayload } = res.locals;

  const bookings = await getBookingsByUserId(jwtPayload.id);

  res.send(bookings);
}

export function checkBookingDetails(req, res, next) {
  const { seats, guestEmail, guestPhone } = req.body;

  if (!seats || !Array.isArray(seats) || seats.length == 0) {
    return res.status(400).send("seats not supplied");
  }

  for (let i = 0; i < seats.length; i++) {
    let seat = seats[i];
    const { seatRow, seatNumber, ticketType } = seat;

    if (
      !seatRow ||
      !seatNumber ||
      !ticketType ||
      isNaN(Number(seatRow)) ||
      isNaN(Number(seatNumber)) ||
      isNaN(Number(ticketType)) ||
      ticketType > 3 ||
      ticketType < 1
    ) {
      return res.status(400).send("seat structure is not correct");
    }
  }

  if (!guestEmail || !guestEmail.toLowerCase().match(/@/)) {
    return res.status(400).send("email not supplied");
  }
  if (!guestPhone || isNaN(Number(guestPhone))) {
    return res.status(400).send("phone number not supplied");
  }

  next();
}

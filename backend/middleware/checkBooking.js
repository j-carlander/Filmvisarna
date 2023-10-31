export function checkBookingDetails(req, res, next) {
  const { seats, guestEmail } = req.body;

  if (!seats || !Array.isArray(seats) || seats.length == 0) {
    return res.status(400).send({ error: "Säten skickades inte med!" });
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
      return res
        .status(400)
        .send({ error: "Strukturen på sätena är felaktig!" });
    }
  }

  if (!res.locals.jwtPayload) {
    if (!guestEmail || !guestEmail.toLowerCase().match(/@/)) {
      return res.status(400).send({ error: "Email skickades inte med!" });
    }
  }

  next();
}

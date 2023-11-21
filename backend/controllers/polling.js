/**
 * Controller for handling requests to handle long-polling for seats in booking process
 * sends response status 204 when timeout is reached (20s) when no content
 * sends response status 200 and the updated version on seats for a screening on success
 */

const subscription = {};

export function updateSubscribers(screeningid, seats, event) {
  if (subscription[screeningid] === undefined) {
    return;
  }

  const seatsArray = seats.map((seat) => ({
    seatrow: seat.rowNumber,
    seatnumber: seat.seatNumber,
  }));

  for (let res of subscription[screeningid]) {
    res.json({ seatsArray, event });
  }
}

export function subscribe(req, res) {
  const { screeningid } = req.params;

  if (!subscription[screeningid]) {
    subscription[screeningid] = [res];
  } else {
    subscription[screeningid].push(res);
  }

  const timer = setTimeout(() => {
    res.status(204).send();
  }, 20000);

  res.on("close", () => {
    subscription[screeningid].splice(subscription[screeningid].indexOf(res), 1);
    if (subscription[screeningid].length === 0) {
      delete subscription[screeningid];
    }

    clearTimeout(timer);
  });
}

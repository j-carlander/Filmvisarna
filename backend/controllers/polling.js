const subscription = {};

export function updateSubscribers(screeningid, seats) {
  for (let res of subscription[screeningid]) {
    res.json(seats);
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
  }, 2000);

  res.on("close", () => {
    subscription[screeningid].splice(subscription[screeningid].indexOf(res), 1);
    if (subscription[screeningid].length === 0) {
      delete subscription[screeningid];
      console.log(subscription);
    }

    clearTimeout(timer);
  });
}

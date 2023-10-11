const dateErrorMessage =
  "Date value has incorrect format! Try format: yyyy-MM-dd";

export function checkMovieFilterQueries(req, res, next) {
  const { date } = req.query;

  if (date) {
    if (typeof date !== "string" || !date.includes("-"))
      return res.status(400).send(dateErrorMessage);

    const splitDate = date.split("-");

    if (
      splitDate.length !== 3 ||
      splitDate[0].length !== 4 ||
      splitDate[1].length !== 2 ||
      splitDate[2].length !== 2
    )
      return res.status(400).send(dateErrorMessage);

    for (let val of splitDate) {
      if (isNaN(Number(val))) return res.status(400).send(dateErrorMessage);
    }
  }

  next();
}
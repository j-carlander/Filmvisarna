/**
 * A middleware for checking that if a query is sent with the request for getting movies they are of expected type and format
 * if not, aborts the request and responds with a status 400 and a message in Swedish that the data provided was in the wrong format
 */

const dateErrorMessage =
  "Värdet på datumet har fel format! Rätt format: åååå-mm-dd";
const ageErrorMessage = "Värdet på ålder är inte giltigt!";

export function checkMovieFilterQueries(req, res, next) {
  const { date, age, upcoming } = req.query;

  if (date) {
    if (typeof date !== "string" || !date.includes("-"))
      return res.status(400).json({ error: dateErrorMessage });

    const splitDate = date.split("-");

    if (
      splitDate.length !== 3 ||
      splitDate[0].length !== 4 ||
      splitDate[1].length !== 2 ||
      splitDate[2].length !== 2
    )
      return res.status(400).json({ error: dateErrorMessage });

    for (let val of splitDate) {
      if (isNaN(Number(val)))
        return res.status(400).json({ error: dateErrorMessage });
    }
  }

  if (age) {
    if (isNaN(Number(age)))
      return res.status(400).json({ error: ageErrorMessage });
  }

  if (upcoming) {
    if (upcoming !== "true" && upcoming !== "false")
      return res
        .status(400)
        .json({ error: "Värdet på upcoming ska vara true eller false!" });
  }

  next();
}

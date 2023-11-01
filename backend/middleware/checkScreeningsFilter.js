const dateErrorMessage = "Fel format på datum! Rätt format: åååå-mm-dd";

export function checkScreeningFilter(req, res, next) {
  const { date, movieid } = req.params;

  if (!date || !movieid) {
    return res
      .status(400)
      .json({ error: "Datum och/eller movieid skickades inte med!" });
  }
  if (isNaN(Number(movieid))) {
    return res.status(400).json({ error: "Movieid är inte en siffra!" });
  }

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

  next();
}

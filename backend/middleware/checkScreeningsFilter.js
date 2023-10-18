const dateErrorMessage =
  "Date value has incorrect format! Try format: yyyy-MM-dd";

export function checkScreeningFilter(req, res, next) {
  const { date, movieid } = req.params;

  if (!date || !movieid) {
    return res.status(400).send({ err: "Date and/or movieid not provided" });
  }
  if (isNaN(Number(movieid))) {
    return res.status(400).send({ err: "Movieid is not a number" });
  }

  if (typeof date !== "string" || !date.includes("-"))
    return res.status(400).send({ err: dateErrorMessage });

  const splitDate = date.split("-");

  if (
    splitDate.length !== 3 ||
    splitDate[0].length !== 4 ||
    splitDate[1].length !== 2 ||
    splitDate[2].length !== 2
  )
    return res.status(400).send({ err: dateErrorMessage });

  for (let val of splitDate) {
    if (isNaN(Number(val)))
      return res.status(400).send({ err: dateErrorMessage });
  }

  next();
}

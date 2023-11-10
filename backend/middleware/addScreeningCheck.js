const dateErrorMessage =
  "Datumet har fel format! Det ska vara åååå-mm-dd hh:mm";

export function addScreeningCheck(req, res, next) {
  const { date, movieid, theatreid, languageid, subtitleid } = req.body;

  if (!date || !movieid || !theatreid || !languageid || !subtitleid)
    return res
      .status(400)
      .json({ error: "Du skickade inte med alla egenskaper!" });

  if (
    typeof date !== "string" ||
    !date.includes("-") ||
    !date.includes(" ") ||
    !date.includes(":")
  )
    return res.status(400).json({ error: dateErrorMessage });

  const splitFormat = date.split(" ");

  const splitDate = splitFormat[0].split("-");
  const splitTime = splitFormat[1].split(":");

  if (
    splitDate.length !== 3 ||
    splitDate[0].length !== 4 ||
    splitDate[1].length !== 2 ||
    splitDate[2].length !== 2 ||
    splitTime.length !== 2 ||
    splitTime[0].length !== 2 ||
    splitTime[1].length !== 2 ||
    isNaN(Number(splitDate[0])) ||
    isNaN(Number(splitDate[1])) ||
    isNaN(Number(splitDate[2])) ||
    isNaN(Number(splitTime[0])) ||
    isNaN(Number(splitTime[1]))
  )
    return res.status(400).json({ error: dateErrorMessage });

  for (let val of splitDate) {
    if (isNaN(Number(val)))
      return res.status(400).json({ error: dateErrorMessage });
  }

  if (
    isNaN(Number(movieid)) ||
    isNaN(Number(theatreid)) ||
    isNaN(Number(languageid)) ||
    isNaN(Number(subtitleid))
  )
    return res
      .status(400)
      .json({ error: "Vissa/alla egenskaper har fel datatyp!" });

  next();
}
/**
 * A middleware for checking that the data provided with the request for adding a new ascreening is of expected format
 * and that the date and time of the screening is not colliding with another screening
 * if tests don't pass, aborts the request and responds with a status 400 and a message in Swedish that some data wasn't provided
 * or that it was in the wrong format or that the date collides
 */

import { addScreeningDateCheckService } from "../service/addScreeningDateCheckService.js";

const dateErrorMessage =
  "Datumet har fel format! Det ska vara åååå-mm-dd hh:mm";

export async function addScreeningCheck(req, res, next) {
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

  const notClashing = await addScreeningDateCheckService(
    splitFormat[0],
    date,
    theatreid,
    movieid
  );
  if (notClashing) {
    next();
  } else {
    res
      .status(400)
      .json({ error: "Visningstiden krockar med en annan visning" });
  }
}

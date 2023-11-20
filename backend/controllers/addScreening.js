/**
 * Controller for handling requests to add a screening for a movie
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 201 and a message in Swedish that the screening was added on success
 */

import { addScreening } from "../service/screeningsService.js";

export async function addScreeningRoute(req, res) {
  const { date, movieid, theatreid, languageid, subtitleid } = req.body;

  const result = await addScreening({
    date,
    movieid,
    theatreid,
    languageid,
    subtitleid,
  });

  if (result.affectedRows !== 1)
    return res.status(500).json({ error: "Internt serverfel!" });

  res.status(201).json({ message: "Visningen har lagts till!" });
}

/**
 * Controller for handling requests to update movies ishidden true/false
 * To be used by admin and super role only, checked in corresponding middleware
 * sends response status 400 and a message in Swedish if you are trying to hide
 * a movie that has active screenings
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 200 and the updated isHidden value on success
 */

import { toggleHiddenService } from "../service/toggleHiddenService.js";
import { runQuery } from "../db.js";

export async function toggleHiddenController(req, res) {
  try {
    const { movieid } = req.params;

    const screeningCheckSql = `SELECT COUNT(*) as count FROM screenings WHERE movieid = ?`;
    const screeningCheckResult = await runQuery(screeningCheckSql, [movieid]);

    if (screeningCheckResult[0].count > 0) {
      return res
        .status(400)
        .json({ error: "Det går inte att dölja en film med aktiva visningar" });
    }

    const result = await toggleHiddenService(movieid);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internt serverfel!" });
  }
}

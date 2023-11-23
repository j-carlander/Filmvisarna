/**
 * Controller for handling requests to search for a name
 * To be used by Admin or Super role only, checked in corresponding middleware
 * sends response status 400 and a message in Swedish if no query was provided
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 200 and the name information on success
 */

import { getNames } from "../service/getNamesService.js";

export async function findName(req, res) {
  try {
    const { q } = req.query;
    if (q) {
      const names = await getNames(q);
      return res.json(names);
    } else {
      return res.status(400).json({
        error:
          "Du måste söka på ett befintligt namn på skådespelare eller regissör",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internt serverfel!" });
  }
}

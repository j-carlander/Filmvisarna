/**
 * Controller for handling requests to search for a language
 * To be used by Admin or Super role only, checked in corresponding middleware
 * sends response status 400 and a message in Swedish if no query was provided
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 200 and the language information on success
 */

import { searchLanguage } from "./Language.js";

export async function findLanguage(req, res) {
  try {
    const { q } = req.query;
    if (q) {
      const languages = await searchLanguage(q);
      return res.json(languages);
    } else {
      return res.status(400).json({
        error:
          "Du måste söka på ett befintligt språk, exempelvis sv för svenska",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internt serverfel!" });
  }
}

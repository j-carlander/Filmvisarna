/**
 * Controller for handling requests to add a language
 * sends response status 400 and an error message in Swedish that the language to be added wasn't in the request
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 201 and the id and name of the language on success
 */

import { runQuery } from "../db.js";

export async function addLanguage(req, res) {
  try {
    const { language } = req.body;

    if (!language) {
      return res.status(400).json({ error: "Språk är obligatoriskt" });
    }
    const query = "INSERT INTO languages (language) VALUES (?)";
    const result = runQuery(query, [language]);

    const insertedLanguageId = result.insertId;
    const insertedLanguage = { id: insertedLanguageId, language };

    res.status(201).json(insertedLanguage);
  } catch (error) {
    res.status(500).json({ error: "Internt serverfel!" });
  }
}

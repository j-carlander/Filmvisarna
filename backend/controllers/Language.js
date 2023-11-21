/**
 * Controller for handling requests to get language, search for language
 * and get correct language for the movie
 * To be used by Admin or Super role only, checked in corresponding middleware
 * sends response status 500 and an Internal server error message in Swedish
 * on fail by retrieving language
 * sends response status 200 and the language information on success
 */

import { runQuery } from "../db.js";

export async function getLanguages(req, res) {
  try {
    const query = "SELECT id, language FROM languages";
    const languages = await runQuery(query);
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: "Internt serverfel!" });
  }
}

export async function getLanguagesByMovieId(req, res) {
  const { movieid } = req.params;
  const query =
    "SELECT l.id, l.language FROM movielanguages AS ml JOIN languages AS l ON ml.languageid = l.id WHERE ml.movieid = ?";
  try {
    const movieLanguages = await runQuery(query, [movieid]);
    res.json(movieLanguages);
  } catch (error) {
    res.status(500).json({ error: "Internt serverfel!" });
  }
}

export async function searchLanguage(language) {
  const searchQuery = `${language}%`;
  const sql = `SELECT * FROM languages WHERE language LIKE ?`;
  const res = await runQuery(sql, [searchQuery]);
  return res;
}

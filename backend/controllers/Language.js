import { runQuery } from "../db.js";

export async function getLanguages(req, res) {
  try {
    const query = "SELECT id, language FROM languages";
    const languages = await runQuery(query);
    res.json(languages);
  } catch (error) {
    console.log("Fel vid hämtning av språk", error);
    res.status(500).json({ error: "Internt serverfel " });
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
    console.log("Fel vid hämtning av språk", error);
    res.status(500).json({ error: "Internt serverfel " });
  }
}

export async function searchLanguage(language) {
  const searchQuery = `${language}%`;
  const sql = `SELECT * FROM languages WHERE language LIKE ?`;
  const res = await runQuery(sql, [searchQuery]);
  return res;
}

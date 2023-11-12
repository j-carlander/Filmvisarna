import { runQuery } from "../db";

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

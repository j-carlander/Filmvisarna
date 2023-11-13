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
    console.log("Fel vid lägg till språk:", error);
    res.status(500).json({ error: "Internt serverfel" });
  }
}

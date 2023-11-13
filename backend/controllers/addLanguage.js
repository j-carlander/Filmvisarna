import { runQuery } from "../db";

export async function addLanguage(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Namn är obligatoriskt" });
    }
    const query = "INSERT INTO languages (name) VALUES (?)";
    const result = runQuery(query, [name]);

    const insertedLanguageId = result.insertId;
    const insertedLanguage = { id: insertedLanguageId, name };

    res.status(201).json(insertedLanguage);
  } catch (error) {
    console.log("Fel vid lägg till språk:", error);
    res.status(500).json({ error: "Internt serverfel" });
  }
}

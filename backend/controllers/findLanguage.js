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
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

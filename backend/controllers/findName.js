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
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

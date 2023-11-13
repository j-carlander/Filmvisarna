import { addGenreService } from "../service/addGenreService.js";

export async function addGenreController(req, res) {
  const { genre } = req.body;

  const result = await addGenreService(genre);

  if (result.affectedRows === 0)
    return res.status(500).json({ error: "Internt server fel!" });

  res.json({ message: "Genren har lagts till!" });
}

/**
 * Controller for handling requests to add a genre
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 201 and the id and name of the genre on success
 */

import { addGenreService } from "../service/addGenreService.js";

export async function addGenreController(req, res) {
  const { genre } = req.body;

  const result = await addGenreService(genre);

  if (result.affectedRows === 0)
    return res.status(500).json({ error: "Internt serverfel!" });

  res.status(201).json({ id: result.insertId, category: genre });
}

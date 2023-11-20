/**
 * Controller for handling requests to add a name for an actor or director
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 201 and a message in Swedish that the movie was added on success
 */

import { addNameService } from "../service/nameService.js";

export async function addName(req, res) {
  const { name } = req.body;

  const result = await addNameService(name);

  if (result.affectedRows === 0)
    return res.status(500).json({ error: "Internt serverfel!" });

  res.status(201).json({ id: result.insertId, name });
}

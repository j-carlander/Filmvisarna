import { addNameService } from "../service/nameService.js";

export async function addName(req, res) {
  const { name } = req.body;

  const result = await addNameService(name);

  if (result.affectedRows === 0)
    return res.status(500).json({ error: "Internt server fel!" });

  res.status(201).json({ id: result.insertId, name });
}

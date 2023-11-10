import { removeScreening } from "../service/screeningsService.js";

export async function removeScreeningRoute(req, res) {
  const { screeningId } = req.params;

  const result = await removeScreening(screeningId);

  if (result.affectedRows !== 1) {
    return res.status(500).json({ error: "Internt serverfel!" });
  }

  res.status(201).json({ message: "Visningen har tagits bort!" });
}
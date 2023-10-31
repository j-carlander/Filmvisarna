import { screeningsService } from "../service/screeningsService.js";

export async function checkScreeningId(req, res, next) {
  const { screeningid } = req.params;
  if (isNaN(Number(screeningid))) {
    return res
      .status(400)
      .json({ error: "Screening Id måste vara ett nummer!" });
  }
  const result = await screeningsService(screeningid);
  if (result.length == 0) {
    return res.status(404).json({ error: "Visningen existerar inte!" });
  }
  next();
}

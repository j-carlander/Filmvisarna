import { screeningsService } from "../service/screeningsService.js";

export async function checkScreeningId(req, res, next) {
  const { screeningid } = req.params;
  if (isNaN(Number(screeningid))) {
    return res.status(400).send("Screening Id has to be a number");
  }
  const result = await screeningsService(screeningid);
  if (result.length == 0) {
    return res.status(404).send("Screening does not exist");
  }
  next();
}

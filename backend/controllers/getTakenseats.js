import { takenseatsService } from "../service/takenseatsService.js";

export async function getTakenseats(req, res) {
  const { screeningid } = req.params;
  const result = await takenseatsService(screeningid);
  res.send(result);
}

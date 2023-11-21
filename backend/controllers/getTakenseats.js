/**
 * Controller for handling requests to get which seats are taken based on screeningid
 * sends response status 200 and result on success
 */

import { takenseatsService } from "../service/takenseatsService.js";

export async function getTakenseats(req, res) {
  const { screeningid } = req.params;
  const result = await takenseatsService(screeningid);
  res.send(result);
}

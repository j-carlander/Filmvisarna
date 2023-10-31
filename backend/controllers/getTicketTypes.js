import { getTicketTypesService } from "../service/gettickettypeservice.js";

export async function getTicketTypes(req, res) {
  const result = await getTicketTypesService();
  if (!result || result.length === 0) {
    return res.status(404).json({ error: "Hittade inga biljettyper!" });
  }
  res.status(200).json(result);
}

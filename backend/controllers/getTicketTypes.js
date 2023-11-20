/**
 * Controller for handling requests to get ticket types (ordinarie, pensionar, barn)
 * sends response status 404 and a message in Swedish if no tickets were found
 * sends response status 200 and the ticket information on success
 */

import { getTicketTypesService } from "../service/gettickettypeservice.js";

export async function getTicketTypes(req, res) {
  const result = await getTicketTypesService();
  if (!result || result.length === 0) {
    return res.status(404).json({ error: "Hittade inga biljettyper!" });
  }
  res.status(200).json(result);
}

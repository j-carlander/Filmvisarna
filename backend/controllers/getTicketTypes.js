import { getTicketTypesService } from "../service/gettickettypeservice.js";

export async function getTicketTypes(req, res) {
    const result = await getTicketTypesService();
    if (!result || result.length === 0) {
        return res.status(404).send("Tickettypes not found")
    }
    res.status(200).json(result);
}
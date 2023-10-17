import { runQuery } from "../db.js";

export async function getTicketTypesService() {
    const sql = `
    SELECT * FROM tickettypes
    `;
    const res = await runQuery(sql);
    return res;
}

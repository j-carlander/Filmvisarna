import { runQuery } from "../db.js";

export async function checkTotalSeatsForRow(screeningid, rownumber) {
  const sql = `
    SELECT numberofseats
    FROM theatrerows
    WHERE theatreid = (SELECT theatreid FROM screenings WHERE id = ?)
    AND rownumber = ?;
  `;
  const res = await runQuery(sql, [screeningid, rownumber]);

  if (res.length === 0) {
    throw new Error(`Row ${rownumber} not found for screening ${screeningid}`);
  }

  return res[0].numberofseats;
}

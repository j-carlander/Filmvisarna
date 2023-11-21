/**
 * Service for getting all names similiar to query
 */

import { runQuery } from "../db.js";

export async function getNames(name) {
  const searchQuery = `${name}%`;
  const sql = `SELECT * FROM names WHERE name LIKE ?`;
  const res = await runQuery(sql, [searchQuery]);
  return res;
}

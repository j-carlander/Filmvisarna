/**
 * Service for toggle hidden for movies into database
 * formatting isHidden(boolean) from numbers to true or false
 */

import { runQuery } from "../db.js";

export async function toggleHiddenService(movieid) {
  const updateSql = `UPDATE movies SET ishidden = NOT ishidden WHERE id = ?`;
  await runQuery(updateSql, [movieid]);

  const selectSql = `SELECT ishidden FROM movies WHERE id = ?`;
  const result = await runQuery(selectSql, [movieid]);

  const updatedValue = result[0].ishidden === 1 ? true : false;

  return { ishidden: updatedValue };
}

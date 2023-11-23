/**
 * Controller for handling requests to search for a registered user
 * To be used by Super role only, checked in corresponding middleware
 * sends response status 400 and a message in Swedish if no query was provided
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 200 and the user information on success
 */

import { getUserWithBoth } from "../service/getUserAdminService.js";

export async function findUser(req, res) {
  try {
    const { q } = req.query;
    if (q) {
      const users = await getUserWithBoth(q);
      return res.json(users);
    } else {
      return res
        .status(400)
        .json({ error: "Du måste söka på ett namn eller en mailadress" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internt serverfel!" });
  }
}

/**
 * Controller for handling requests to update a user role (user --> admin, admin --> user)
 * To be used by Super role only, checked in corresponding middleware
 * sends response status 400 and a message in Swedish if user has no role
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 200 and the updated role on success
 */

import {
  setUserRoleToAdmin,
  setUserRoleToUser,
} from "../service/updateUserRoleService.js";

export async function updateUserRole(req, res) {
  try {
    const { id, role } = req.body;
    if (role == "user") {
      const result = await setUserRoleToAdmin(id);
      return res.json(result);
    } else if (role == "admin") {
      const result = await setUserRoleToUser(id);
      return res.json(result);
    } else {
      return res.status(400).json({ error: "Användaren har ingen roll." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internt serverfel!" });
  }
}

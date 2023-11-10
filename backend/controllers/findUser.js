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
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

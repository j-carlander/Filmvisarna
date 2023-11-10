import { setUserRoleToAdmin, setUserRoleToUser } from "../service/updateUserRoleService.js";

export async function updateUserRole(req, res) {
    try {
        const { id, role } = req.query;
        if (role == "user") {
            const result = await setUserRoleToAdmin(id)
            return res.json(result)
        } else if (role == "admin") {
            const result = await setUserRoleToUser(id)
            return res.json(result)
        } else {
            return res.status(400).json({ error: "User does not have a role."})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}
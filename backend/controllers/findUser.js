import { getUserWithName, getUserWithMail, getUserWithBoth } from "../service/getUserAdminService.js"

export async function findUser(req, res) {
    try {
        const { fname, lname, email } = req.query;
        if (fname && lname && email) {
            const users = await getUserWithBoth(fname, lname, email)
            return res.json(users);
        } else if (fname && lname) {
            const users = await getUserWithName(fname, lname);
            return res.json(users);
        } else if (email) {
            const user = await getUserWithMail(email);
            return res.json(user)
        } else {
            return res.status(400).json({ error: "Please provide either first name and last name or email."})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" })
    }

}
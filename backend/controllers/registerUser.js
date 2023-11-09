import bcrypt from "bcrypt";
import { runQuery } from "../db.js";
import { isPasswordComplex } from "../utils/checkPasswordComplexity.js";

export async function registerHandler(req, res) {
  const { fname, lname, phone, email, password, repassword } = req.body;

  if (!fname || !lname) {
    return res
      .status(400)
      .json({ error: "Saknar förnamn och/eller efternamn!" });
  }
  if (!phone || !email) {
    return res
      .status(400)
      .json({ error: "Saknar mobilnummer och/eller email!" });
  }

  if (isNaN(Number(phone)))
    return res.status(400).json({ error: "Telefonnumret är inte ett nummer!" });

  if (!password || !repassword) {
    return res.status(400).json({ error: "Saknar lösenord!" });
  }

  //Om lösen1 inte matchar med lösen2
  if (password !== repassword) {
    return res.status(400).json({ error: "Lösenorden matchar inte!" });
  }

  if (!isPasswordComplex(password))
    return res
      .status(400)
      .json({ error: "Lösenordet är inte tillräckligt komplicerat!" });

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.error("Password hashing error: " + err.message);
      return res.status(500).json({ error: "Internt server fel!" });
    }

    const insertRegisterQuery =
      "INSERT INTO users (fname, lname, phone, email, password, isadmin) VALUES (?, ?, ?, ?, ?, false)";

    try {
      const result = await runQuery(insertRegisterQuery, [
        fname,
        lname,
        phone,
        email,
        hashedPassword,
      ]);

      // Om användaren är successfully registrerad
      if (result.affectedRows === 1) {
        res.status(201).json({ message: "Ditt konto har skapats!" });
      } else {
        res.status(400).json({ error: "Ditt konto skapades inte!" });
      }
    } catch (error) {
      console.error("Error: " + error.message);
      return res.status(400).json({ error: "Ditt konto skapades inte!" });
    }
  });
}

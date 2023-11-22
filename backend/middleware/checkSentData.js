/**
 * A middleware for checking that the data provided with the request is of expected type and format
 * if not, aborts the request and responds with a status 400 and a message in Swedish that data was in the wrong format
 */

import {
  checkEmailForUnwantedChar,
  checkNameForUnwantedChar,
} from "../utils/checkForUnwantedChar.js";
import { isPasswordComplex } from "../utils/checkPasswordComplexity.js";

export function validateData(req, res, next) {
  const errors = {};
  const fields = req.body;

  for (const field of Object.keys(fields)) {
    if (typeof req.body[field] !== "string" || req.body[field].trim() === "") {
      errors[field] = `${field} är ogiltigt!`;
    }
  }

  //Displayar error beroende på antal fields som är invalid.
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: errors });
  }
  next();
}

export function validateRegisterData(req, res, next) {
  const { fname, lname, phone, email, password, repassword } = req.body;
  if (!fname || !lname) {
    return res
      .status(400)
      .json({ error: "Saknar förnamn och/eller efternamn!" });
  }
  if (fname.length > 30 || lname.length > 30) {
    return res.status(400).json({
      error: "Förnamen eller efternamn är för långt, får max vara 30 tecken!",
    });
  }

  if (!checkNameForUnwantedChar(fname) || !checkNameForUnwantedChar(lname)) {
    return res
      .status(400)
      .json({ error: "Förnamn eller efternamn innehåller otillåtna tecken!" });
  }

  if (!phone || !email) {
    return res
      .status(400)
      .json({ error: "Saknar mobilnummer och/eller email!" });
  }

  if (!checkEmailForUnwantedChar(email)) {
    return res
      .status(400)
      .json({ error: "Email innehåller otillåtna tecken!" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Inte en giltig email adress!" });
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

  next();
}

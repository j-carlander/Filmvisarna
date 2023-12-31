/**
 * The jsx for generating a register page with the form needed to create an account
 * and the fetch for submitting the form
 */

import { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { fetchHelper } from "../../utils/fetchHelper";
import { isPasswordComplex } from "../../../backend/utils/checkPasswordComplexity";

const standardFormData = {
  fname: "",
  lname: "",
  phone: "",
  email: "",
  password: "",
  repassword: "",
};

export function RegisterPage() {
  const [formData, setFormData] = useState({ ...standardFormData });
  const setToken = useOutletContext()[1];
  const [passwordError, setPasswordError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (passwordError) {
      const clearErrorTimeout = setTimeout(() => {
        setPasswordError("");
      }, 2000);
      return () => clearTimeout(clearErrorTimeout);
    }
  }, [passwordError]);

  function onPhoneChange(e) {
    const value = e.target.value;

    if (isNaN(Number(value))) return;

    setFormData((old) => ({ ...old, phone: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerMessage("");

    if (!isPasswordComplex(formData.password)) {
      setPasswordError("Lösenordet är inte tillräckligt komplicerat");
      return;
    }

    setPasswordError("");

    const result = await fetchHelper("/register", "post", formData);
    if (result.status === 201) {
      const loginResult = await fetchHelper("/login", "post", {
        email: formData.email,
        password: formData.password,
      });
      const loginData = await loginResult.json();
      setToken(loginData.token);
      setServerMessage("Ditt konto har skapats och du är inloggad!");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      setFormData({ ...standardFormData });
    } else if (result.status >= 400) {
      setServerMessage((await result.json()).error);
    }
  }

  return (
    <article className="register-page-wrapper">
      <h1>Bli medlem</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          required
          value={formData.fname}
          type="text"
          placeholder="Förnamn"
          onChange={(e) => {
            setFormData({ ...formData, fname: e.target.value });
          }}
        />
        <input
          required
          value={formData.lname}
          type="text"
          placeholder="Efternamn"
          onChange={(e) => {
            setFormData({ ...formData, lname: e.target.value });
          }}
        />
        <input
          required
          value={formData.phone}
          type="tel"
          placeholder="Telefon"
          onChange={onPhoneChange}
        />
        <input
          required
          value={formData.email}
          type="email"
          placeholder="Epost"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <input
          required
          value={formData.password}
          type="password"
          placeholder="Lösenord"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <input
          required
          value={formData.repassword}
          type="password"
          placeholder="Bekräfta lösenord"
          onChange={(e) => {
            setFormData({ ...formData, repassword: e.target.value });
          }}
        />

        {passwordError && <div className="error-message">{passwordError}</div>}
        {serverMessage && <div className="error-message">{serverMessage}</div>}
        <div className="form-footer">
          <img src="/Klappa.png" />
          <div className="form-controlls">
            <button className="confirm-button" type="submit">
              Bli medlem
            </button>
            <p>
              Jag är redan medlem - <Link to={"/logga-in"}>logga in här</Link>
            </p>
            <button
              className="cancel-button"
              type="reset"
              onClick={() => navigate(-1)}>
              Avbryt
            </button>
          </div>
          <img src="/Projektor.png" />
        </div>
      </form>
    </article>
  );
}

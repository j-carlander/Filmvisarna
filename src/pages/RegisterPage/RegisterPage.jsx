import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { fetchHelper } from "../../utils/fetchHelper";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [setToken] = useOutletContext();
  async function handleSubmit(e) {
    e.preventDefault();
    const result = await fetchHelper("/register", "post", formData);
    if (result.status === 201) {
      const loginResult = await fetchHelper("/login", "post", {
        email: formData.email,
        password: formData.password,
      });
      const loginData = await loginResult.json();
      setToken(loginData.token);
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
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
          }}
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

        <div className="form-footer">
          <img src="/Klappa.png" />
          <div className="form-controlls">
            <button className="confirm-button">Bli medlem</button>
            <p>
              Jag är redan medlem - <Link>logga in här</Link>
            </p>
            <button className="cancel-button">Avbryt</button>
          </div>
          <img src="/Projektor.png" />
        </div>
      </form>
    </article>
  );
}
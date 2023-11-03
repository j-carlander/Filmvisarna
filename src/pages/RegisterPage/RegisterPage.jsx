import { useState } from "react";
import { Link } from "react-router-dom";
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

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await fetchHelper("/register", "post", formData)
    const data = await result.json();
    console.log(data)
  }

  return (
    <>
      <h1>Bli medlem</h1>
      <form onSubmit={handleSubmit}>
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

        <button>Bli medlem</button>
        <p>
          Jag är redan medlem - <Link>logga in här</Link>
        </p>
        <button>Avbryt</button>
      </form>
    </>
  );
}

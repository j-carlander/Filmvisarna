import { useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchHelper } from "../../utils/fetchHelper";

export function CancelBookingPage() {
  const [serverMsg, setServerMsg] = useState("");
  const [values, setValues] = useState({ guestemail: "", bookingnumber: "" });

  async function onSubmit(e) {
    e.preventDefault();

    const response = await fetchHelper("/booking", "delete", { ...values });

    const json = await response.json();

    console.log(json);

    if (response.status < 400) {
      setServerMsg("Din bokning har makulerats!");
    } else if (response.status === 404) {
      setServerMsg("Bokningen kunde inte hittas!");
    } else {
      setServerMsg(json.err);
    }
  }

  function onChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [key]: value });
  }

  return (
    <article className="cancel-booking-page">
      <h1 className="page-title">Avboka</h1>
      <form onSubmit={onSubmit} className="cancel-form">
        <input
          name="guestemail"
          placeholder="Email"
          className="form-input"
          onChange={onChange}
          value={values.guestemail}
          type="email"
          required
        />
        <input
          name="bookingnumber"
          placeholder="Bokningsnummer"
          className="form-input"
          onChange={onChange}
          value={values.bookingnumber}
          required
        />
        <button type="submit">Avboka</button>
        <NavLink to={"/"}>Till hemsidan</NavLink>
        {serverMsg !== "" && <p>{serverMsg}</p>}
      </form>
    </article>
  );
}

import { useState } from "react";
import { NavLink } from "react-router-dom";

export function CancelBookingPage() {
  const [serverMsg, setServerMsg] = useState("");
  const [values, setValues] = useState({ guestemail: "", bookingnumber: "" });

  function onSubmit(e) {
    e.preventDefault();
    console.log("Send request to server!");
    setServerMsg("Din bokning har makulerats!");
  }

  function onChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [key]: value });
  }

  return (
    <article className="cancel-booking-page">
      <h1>Avboka</h1>
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

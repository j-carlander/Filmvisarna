/**
 * The jsx for generating a page with a form to cancel a booking
 * If a link with querys for email and booking number is used to view the page
 * the form fields will be filled in automatically
 * When the form is submitted it sends a delete request
 */

import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { fetchHelper } from "../../utils/fetchHelper";

export function CancelBookingPage() {
  const [serverMsg, setServerMsg] = useState("");
  const [values, setValues] = useState({ guestemail: "", bookingnumber: "" });

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const bookingNumber = searchParams.get("bookingNumber");
    const email = searchParams.get("email");

    // Populate the input fields with query parameter values
    if (bookingNumber && email) {
      setValues({ guestemail: email, bookingnumber: bookingNumber });
    }
  }, [location]);

  async function onSubmit(e) {
    e.preventDefault();

    const response = await fetchHelper("/booking", "delete", { ...values });

    const json = await response.json();

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

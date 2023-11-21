/**
 * Component for booking
 * handleBooking sends a fetch request to add a booking to the database
 * handleBooking returns error if not logged in or no guest email inputted
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sessionService from "../../utils/sessionService";
import { fetchHelper } from "../../utils/fetchHelper";
import { Loading } from "../Loading/Loading";

export function ConfirmBookingCTA({ seats, screeningId, setConfirmationData }) {
  const [guestEmail, setGuestEmail] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = sessionService.getToken();
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : undefined;

  const navigate = useNavigate();

  const bookingData = {
    seats: seats,
    guestEmail: !token ? guestEmail : "",
  };

  async function handleBooking(e) {
    e.preventDefault();

    setServerError("");

    if (!token && guestEmail === "") {
      return setServerError("Du måste vara inloggad eller ange din mail!");
    }

    setLoading(true);
    const response = await fetchHelper(
      `/booking/${screeningId}`,
      "post",
      bookingData
    );
    if (response.ok) {
      setConfirmationData(await response.json());
    } else {
      setServerError((await response.json()).error);
    }
    setLoading(false);
  }
  return (
    <>
      <div className="bookconfirm-interactions">
        {!token ? (
          <>
            <div className="login-signup-group">
              <Link to="/logga-in">
                <button className="login-button">Logga in</button>
              </Link>
              <p>
                Inget konto?{" "}
                <Link className="signup-button" to="/registrera">
                  Bli medlem!
                </Link>
              </p>
            </div>
            <p className="or-text">eller</p>{" "}
          </>
        ) : null}
        <form onSubmit={handleBooking} className="bookconfirm-form">
          {!token ? (
            <div className="guest-info-group">
              <input
                type="email"
                placeholder="Email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
              />
            </div>
          ) : (
            <p className="logged-in-email">
              Inloggad med: <strong>{payload.email}</strong>
            </p>
          )}
          <button className="confirm-button">Bekräfta</button>
          <button
            type="reset"
            className="cancel-button"
            onClick={() => navigate(`/bokning/${screeningId}`)}>
            Avbryt
          </button>
          <p className="server-error-text">{serverError}</p>
        </form>
      </div>
      {loading ? (
        <div className="loading-screen">
          <Loading />
        </div>
      ) : null}
    </>
  );
}

import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import BookingConfirmation from "../../components/BookingConfirmation/BookingConfirmation";
import sessionService from "../../utils/sessionService";
import { Loading } from "../../components/Loading/Loading";
import { useWindowInnerWidth } from "../../hooks/useWindowInnerWidth";
import { formatSeatsForBookingConf } from "../../utils/formatSeatsForBookingConf";

export function BookingConfirmationPage() {
  const windowWidth = useWindowInnerWidth();
  const [guestEmail, setGuestEmail] = useState("");
  const [confirmationData, setConfirmationData] = useState();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { selectedSeats, selectedTickets, data, individual } = location.state;

  const { screeningId } = useParams();

  const token = sessionService.getToken();
  const isLoggedIn = token !== null;

  const payload = token ? JSON.parse(atob(token.split(".")[1])) : undefined;

  const navigate = useNavigate();

  const screeningData = {
    id: data.movieid,
    title: data.title,
    date: data.screeningDate,
    price: selectedTickets.reduce((acc, current) => current.price + acc, 0),
    seats: formatSeatsForBookingConf(individual, selectedSeats),
  };

  const seats = [];
  for (let i = 0; i < selectedSeats.length; i++) {
    seats.push({
      ...selectedSeats[i],
      seatRow: selectedSeats[i].rowNumber,
      ticketType: selectedTickets[i].id,
    });
  }
  const bookingData = {
    seats: seats,
    guestEmail: guestEmail,
  };

  async function handleBooking() {
    setServerError("");

    if (!isLoggedIn && guestEmail === "") {
      return setServerError("Du måste vara inloggad eller ange din mail!");
    }

    if (isLoggedIn) {
      delete bookingData.guestEmail;
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
    <div className="bookconfirm-wrapper">
      <h1>Bokningsöversikt</h1>
      <div className="bookconfirm-page">
        <div className="bookconfirm-screenings">
          {windowWidth >= 850 && (
            <img
              className="bookconfirm-img"
              src={`/images/${screeningData.id}_w400.webp`}
              alt="movie-poster"
            />
          )}
          <p>
            <strong>Titel:</strong> {screeningData.title}
          </p>
          <p>
            <strong>Tid:</strong> {screeningData.date}
          </p>
          <p className={individual ? "individual-seats" : ""}>
            <strong>Valda Platser:</strong> {screeningData.seats}
          </p>
          <p>
            <strong>Att Betala:</strong> {screeningData.price} kr
          </p>
        </div>
        <div className="bookconfirm-interactions">
          {!isLoggedIn && (
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
              <p className="or-text">eller</p>
              <div className="guest-info-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleBooking();
                    }
                  }}
                />
              </div>
            </>
          )}
          {isLoggedIn && (
            <>
              <p className="logged-in-email">
                Inloggad med: <strong>{payload.email}</strong>
              </p>
            </>
          )}
          <button className="confirm-button" onClick={handleBooking}>
            Bekräfta
          </button>
          <button className="cancel-button" onClick={() => navigate(-1)}>
            Avbryt
          </button>
          <p className="server-error-text">{serverError}</p>
        </div>
      </div>
      {loading ? (
        <div className="loading-screen">
          <Loading />
        </div>
      ) : null}
      {confirmationData ? (
        <BookingConfirmation bookingData={confirmationData} />
      ) : null}
    </div>
  );
}

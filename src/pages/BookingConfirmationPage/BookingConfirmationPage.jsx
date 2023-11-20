import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import BookingConfirmation from "../../components/BookingConfirmation/BookingConfirmation";
import sessionService from "../../utils/sessionService";
import { Loading } from "../../components/Loading/Loading";

export function BookingConfirmationPage() {
  const { screeningId } = useParams();
  const location = useLocation();
  const token = sessionService.getToken();
  const isLoggedIn = useState(token !== null)[0];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { selectedSeats, selectedTickets, data, individual } = location.state;
  const [guestEmail, setGuestEmail] = useState("");
  const [confirmationData, setConfirmationData] = useState();
  const [serverError, setServerError] = useState("");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : undefined;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const screeningData = {
    id: data.movieid,
    title: data.title,
    date: data.screeningDate,
    price: selectedTickets.reduce((acc, current) => current.price + acc, 0),
  };

  if (individual) {
    screeningData.seats = selectedSeats.map((seat, index) => (
      <span key={`seat-${index}`}>
        Rad: {seat.rowNumber} plats: {seat.seatNumber}
      </span>
    ));
  } else {
    screeningData.seats = ` rad ${selectedSeats[0].rowNumber} plats 
    ${
      selectedSeats.length === 1
        ? selectedSeats[0].seatNumber
        : `${selectedSeats[selectedSeats.length - 1].seatNumber} - ${
            selectedSeats[0].seatNumber
          }`
    }`;
  }

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

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bookconfirm-wrapper">
      <h1>Bokningsöversikt</h1>
      <div className="bookconfirm-page">
        <div className="bookconfirm-screenings">
          {windowWidth >= 801 && (
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
                    if (e.key === 'Enter') {
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

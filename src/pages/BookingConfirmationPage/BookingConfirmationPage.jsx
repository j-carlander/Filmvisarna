import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import BookingConfirmation from "../../components/BookingConfirmation/BookingConfirmation";
import { useRef } from "react";

// Mock data, kan tas bort/ändras beroende på hur filmdata och sånt skickas in från bokningssida, ändra i html också så den tar emot rätt filmdata.
// Det är förmodligen tänkt att allt data ska samlas ihop till en objekt i bokningssidan som skickas till här, så egenskaper är generellt samma.

export function BookingConfirmationPage() {
  const { screeningId } = useParams();
  const location = useLocation();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { selectedSeats, selectedTickets, data } = location.state;
  const [guestEmail, setGuestEmail] = useState("");
  const [confirmationData, setConfirmationData] = useState();

  const navigate = useNavigate();

  const dialogRef = useRef();

  const screeningData = {
    id: data.movieid,
    title: data.title,
    date: data.screeningDate,
    seats: ` rad ${selectedSeats[0].rowNumber} plats 
    ${
      selectedSeats.length === 1
        ? selectedSeats[0].seatNumber
        : `${selectedSeats[selectedSeats.length - 1].seatNumber} - ${
            selectedSeats[0].seatNumber
          }`
    }`,
    price: selectedTickets.reduce((acc, current) => current.price + acc, 0),
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
    const response = await fetchHelper(
      `/booking/${screeningId}`,
      "post",
      bookingData
    );
    if (response.ok) {
      console.log("Booking successful");
      setConfirmationData(await response.json());
    } else {
      console.error("Booking failed");
    }
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
          <p>
            <strong>Valda Platser:</strong> {screeningData.seats}
          </p>
          <p>
            <strong>Att Betala:</strong> {screeningData.price} kr
          </p>
        </div>
        {/* {isLoggedIn === false && ( */}
        <div className="bookconfirm-interactions">
          {/* <div className="login-signup-group">
              <Link to="/login">
                <button className="login-button">Logga in</button>
              </Link>
              <Link className="signup-button" to="/signup">
                Inget Konto? Bli medlem!
              </Link>
            </div> */}

          <div className="guest-info-group">
            <input
              type="email"
              placeholder="Email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
            />
          </div>
          <button className="confirm-button" onClick={handleBooking}>
            Bekräfta
          </button>
          <button className="cancel-button" onClick={() => navigate(-1)}>
            Avbryt
          </button>
        </div>
        {/* )} */}
      </div>
      {confirmationData ? (
        <BookingConfirmation bookingData={confirmationData} ref={dialogRef} />
      ) : null}
    </div>
  );
}

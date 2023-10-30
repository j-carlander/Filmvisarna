import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";


// Mock data, kan tas bort/ändras beroende på hur filmdata och sånt skickas in från bokningssida, ändra i html också så den tar emot rätt filmdata.
// Det är förmodligen tänkt att allt data ska samlas ihop till en objekt i bokningssidan som skickas till här, så egenskaper är generellt samma.
const screeningData = {
  id: 1,
  title: "Karusell",
  time: "20:00",
  date: "Tisdag 26 Sep",
  seats: "Rad 1, Plats 1-2",
  price: "220",
};

export function BookingConfirmationPage() {
  const { screeningId } = useParams();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [seats, setSeats] = useState([
    {
      seatRow: 6,
      seatNumber: 8,
      ticketType: 2,
    },
    {
      seatRow: 6,
      seatNumber: 9,
      ticketType: 2,
    },
  ]);
  const [guestEmail, setGuestEmail] = useState("");

  const bookingData = {
    seats: seats,
    guestEmail: guestEmail,
  };


  async function handleBooking() {
    const response = await fetchHelper(`/booking/${screeningId}`, 'post', bookingData);
    if (response.ok) {
      console.log('Booking successful');
    } else {
      console.error('Booking failed');
    }
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bookconfirm-wrapper">
      <h2>Bokningsöversikt</h2>
      <div className="bookconfirm-page">
        <div className="bookconfirm-screenings">
          {windowWidth >= 801 && (
            <img
              className="bookconfirm-img"
              src={`/images/${screeningData.id}_w400.webp`}
              alt="movie-poster"
            />
          )}
          <p>Titel: {screeningData.title}</p>
          <p>Tid: {screeningData.time}</p>
          <p>Datum: {screeningData.date}</p>
          <p>Valda Platser: {screeningData.seats}</p>
          <p>Att Betala: {screeningData.price} kr</p>
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
            <button className="confirm-button" onClick={handleBooking}>Bekräfta</button>
            <button className="cancel-button">Avbryt</button>
          </div>
        {/* )} */}
      </div>
    </div>
  );
}
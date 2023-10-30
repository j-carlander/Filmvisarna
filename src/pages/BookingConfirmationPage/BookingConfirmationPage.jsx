import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const screeningData = {
  id: 1,
  title: "Karusell",
  time: "20:00",
  date: "Tisdag 26 Sep",
  seats: "Rad 1, Plats 1-2",
  price: "220",
};

export function BookingConfirmationPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        {isLoggedIn === false && (
          <div className="bookconfirm-interactions">
            <div className="login-signup-group">
              <Link to="/login">
                <button className="login-button">Logga in</button>
              </Link>
              <Link className="signup-button" to="/signup">
                Inget Konto? Bli medlem!
              </Link>
            </div>

            <div className="guest-info-group">
              <input type="email" placeholder="Email" />
              <input type="tel" placeholder="Telefonnummer" />
            </div>
            <button className="confirm-button">Bekräfta</button>
            <button className="cancel-button">Avbryt</button>
          </div>
        )}
      </div>
    </div>
  );
}

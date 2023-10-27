import { Link } from "react-router-dom";

const screeningData = {
  title: "Barbie",
  time: "20:00",
  date: "Tisdag 26 Sep",
  seats: "Rad 1, Plats 1-2",
  price: "220",
};

export function BookingConfirmationPage() {
  return (
  <div className="bookconfirm-wrapper">
    <h2>Bokningsöversikt</h2>
    <div className="booking-confirmation-page">
      <div className="bookconfirm-screenings">
        <p>Titel: {screeningData.title}</p>
        <p>Tid: {screeningData.time}</p>
        <p>Datum: {screeningData.date}</p>
        <p>Valda Platser: {screeningData.seats}</p>
        <p>Att Betala: {screeningData.price} kr</p>
      </div>
      <div className="login-signup-group">
        <Link to="/login">
        <button className="login-button">Login</button>
        </Link>
        <Link to="/signup">
        <button className="signup-button">Inget Konto? Bli medlem!</button>
        </Link>
      </div>

      <div className="guest-info-group">
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Telephone Number" />
      </div>
      <button className="confirm-button">Confirm</button>
      <button className="cancel-button">Cancel</button>
    </div>
  </div>
  );
}

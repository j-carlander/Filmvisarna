import { Link } from "react-router-dom";

export function BookingConfirmationPage() {
  return (
    <div className="booking-confirmation-page">
        <div className="login-signup-group">
            <Link to="/login">
            <button className="login-button">Login</button>
            </Link>
            <Link to="/signup">
            <button className="signup-button">Signup</button>
            </Link>
        </div>

        <div className="guest-info-group">
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Telephone Number" />
        </div>
        <button className="confirm-button">Confirm</button>
        <button className="cancel-button">Cancel</button>
    </div>
  );
}

export default BookingConfirmationPage;

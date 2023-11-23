/**
 * Component for a modal that confirms a booking and displays its info
 */

import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function BookingConfirmation({ bookingData }) {
  const navigate = useNavigate();
  const dateArr = bookingData.date.split(". kl: ");
  const ref = useRef();

  const time = dateArr[1];

  const date = dateArr[0];

  useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, [ref]);

  return (
    <dialog className="booking-confirmation-container" ref={ref}>
      <h3>Du har bokat:</h3>
      <div className="movie-info">
        <p>
          <strong>Titel</strong>: {bookingData.title}
        </p>
        <p>
          <strong>Tid</strong>: {time}
        </p>
        <p>
          <strong>Datum</strong>: {date}
        </p>
        <p>
          <strong>Valda platser</strong>: {bookingData.seats}
        </p>
        <p>
          <strong>Att betala</strong>: {bookingData.totalPrice} kr
        </p>
      </div>
      <p>
        <strong>Bokningsnummer</strong>: {bookingData.bookingNumber}
      </p>
      <strong>En bekräftelse har skickats till din mail!</strong>
      <button className="close-btn" onClick={() => navigate("/")}>
        Stäng
      </button>
    </dialog>
  );
}

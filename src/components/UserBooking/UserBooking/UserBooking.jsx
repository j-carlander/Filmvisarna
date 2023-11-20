import { useRef, useState } from "react";
import UserTickets from "../UserTickets/UserTickets";
import { fetchHelper } from "../../../utils/fetchHelper";

export default function UserBooking({ bookingData, setCurrentBookings }) {
  const [showTickets, setShowTickets] = useState(false);

  const dialogRef = useRef();

  const dateArr = bookingData.date.split(". kl: ");

  const time = dateArr[1];

  const day = dateArr[0];

  async function handleCancelBooking() {
    const res = await fetchHelper("/booking", "delete", {
      bookingnumber: bookingData.bookingnumber,
    });
    const data = await res.json();
    if (res.status < 400) {
      setCurrentBookings((old) => old.filter((el) => el !== bookingData));
    }
  }

  return (
    <li className="user-booking-li">
      <div className="booking-info">
        <p>{bookingData.title}</p>
        <p>{time}</p>
        <p>{day}</p>
      </div>
      <div className="booking-btns">
        <button
          className="show-tickets-btn"
          onClick={() => setShowTickets(true)}>
          Visa biljett
        </button>
        <button
          className="cancel-btn"
          onClick={() => dialogRef.current.showModal()}>
          Avboka
        </button>
      </div>
      {showTickets && (
        <UserTickets {...{ bookingData, setShowTickets, time, day }} />
      )}
      <dialog className="cancel-confirm-dialog" ref={dialogRef}>
        <p>Är du säker på att du vill avboka</p>
        <p className="cancel-dialog-title">{bookingData.title}</p>
        <p className="cancel-dialog-date">{bookingData.date}</p>
        <div className="cancel-dialog-btns">
          <button className="cancel-btn" onClick={handleCancelBooking}>
            Avboka
          </button>
          <button
            className="show-tickets-btn"
            onClick={() => dialogRef.current.close()}>
            Avbryt
          </button>
        </div>
      </dialog>
    </li>
  );
}

import { useState } from "react";
import UserTickets from "../UserTickets/UserTickets";
import { fetchHelper } from "../../../utils/fetchHelper";

export default function UserBooking({ bookingData, setCurrentBookings }) {
  const [showTickets, setShowTickets] = useState(false);

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
    } else {
      console.log(data);
    }
  }

  return (
    <li className="user-booking">
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
        <button className="cancel-btn" onClick={handleCancelBooking}>
          Avboka
        </button>
      </div>
      {showTickets && (
        <UserTickets {...{ bookingData, setShowTickets, time, day }} />
      )}
    </li>
  );
}

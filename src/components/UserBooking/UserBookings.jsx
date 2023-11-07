import { useState, useEffect } from "react";
import UserBooking from "./UserBooking/UserBooking";
import { fetchHelper } from "../../utils/fetchHelper";
import { UserBookingsHistoryCard } from "./UserBookingsHistoryCard/UserBookingsHistoryCard";


export default function UserBookings() {
  const [currentBookings, setCurrentBookings] = useState([]);
  const [serverError, setServerError] = useState(undefined);


  function getBookingElement(bookingData, index) {
    return (
      <UserBooking {...{ bookingData, key: `current-booking-${index}` }} />
    );
  }

  function getBookingHistoryElement(bookingData, index) {
    return (
      <UserBookingsHistoryCard {...{ bookingData, key: `current-booking-${index}` }} />
    );
  }

  useEffect(() => {
    async function fetchBookings() {
      const response = await fetchHelper(`/currentUser/bookings`, "get");

      const json = await response.json();

      if (response.status < 400) {
        setCurrentBookings(json);
      } else {
        setServerError(json.error);
      }
    }

    fetchBookings();
  }, [setServerError]);

  return (
    <>
      <section className="user-bookings">
        <h2 className="user-bookings-title">Bokade biljetter</h2>
        {serverError === undefined ? (
          currentBookings.length > 0 ? (
            <ul>{currentBookings.map(getBookingElement)}</ul>
          ) : (
            <p className="no-bookings">Du har inga nuvarande bokningar!</p>
          )
        ) : (
          <p>{serverError}</p>
        )}
      </section>
      <section className="user-bookings">
        <h2 className="user-bookings-title">Filmhistorik</h2>
        {serverError === undefined ? (
          currentBookings.length > 0 ? (
            <ul>{currentBookings.map(getBookingHistoryElement)}</ul>
          ) : (
            <p className="no-bookings">Du har inga tidigare bokningar!</p>
          )
        ) : (
          <p>{serverError}</p>
        )}
      </section>
    </>
    
  );
}

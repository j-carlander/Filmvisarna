/**
 * Component for user bookings (booked tickets: current and historical)
 * fetches information from the server and displays it in 
 * separate sections (currentBookings and oldBookings)
 */

import { useState, useEffect } from "react";
import UserBooking from "./UserBooking/UserBooking";
import { fetchHelper } from "../../utils/fetchHelper";
import { UserBookingsHistoryCard } from "./UserBookingsHistoryCard/UserBookingsHistoryCard";

export function UserBookings() {
  const [currentBookings, setCurrentBookings] = useState([]);
  const [oldBookings, setOldBookings] = useState([]);
  const [serverError, setServerError] = useState(undefined);

  function getBookingElement(bookingData, index) {
    return (
      <UserBooking
        {...{
          bookingData,
          key: `current-booking-${index}`,
          setCurrentBookings,
        }}
      />
    );
  }

  function getBookingHistoryElement(bookingData, index) {
    return (
      <UserBookingsHistoryCard
        {...{ bookingData, key: `old-bookings-${index}` }}
      />
    );
  }

  useEffect(() => {
    async function fetchBookings() {
      const response = await fetchHelper(`/currentUser/bookings`, "get");

      const json = await response.json();

      if (response.status < 400) {
        setCurrentBookings(json.currentBookings);
        setOldBookings(json.oldBookings);
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
      <section className="user-history">
        <h2 className="user-bookings-title">Filmhistorik</h2>
        {serverError === undefined ? (
          oldBookings.length > 0 ? (
            <ul className="user-history-ul">
              {oldBookings.map(getBookingHistoryElement)}
            </ul>
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

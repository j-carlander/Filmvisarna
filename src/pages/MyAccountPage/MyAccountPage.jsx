/**
 * The jsx for an account page holding 2 componets
 * for the users details and the users bookings
 */

import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { UserBookings } from "../../components/UserBooking/UserBookings";
import { UserDetailsList } from "../../components/UserDetailsList/UserDetailsList";

export function MyAccountPage() {
  const setToken = useOutletContext()[1];
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  function handleClick() {
    setToken(undefined);
    navigate("/");
  }
  return (
    <>
      <div className="my-account-wrapper">
        <div className="my-account-logout">
          <button className="my-account-logout-btn" onClick={handleClick}>
            Logga ut
          </button>
        </div>
        <h1>Min Sida</h1>
        <div className="my-account-content">
          {isLoading ? (
            <div className="loading">
              <div className="loading-inner"></div>
            </div>
          ) : (
            <UserDetailsList />
          )}
          <UserBookings />
        </div>
      </div>
    </>
  );
}

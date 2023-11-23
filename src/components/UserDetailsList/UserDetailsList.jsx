/**
 * Component for user information details
 * fetch and display user details (for example: 
 * name, email, phonenumber)
 * The loading spinner is displayed until the data is fetched.
 * The actual rendering of user details is done in the UserDetails component
 */

import { UserDetails } from "../UserDetails/UserDetails";
import { useEffect, useState } from "react";
import sessionService from "../../utils/sessionService";

export function UserDetailsList() {
  const [userdetails, setUserdetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      const fetchOptions = () => {
        return {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionService.getToken(),
          },
        };
      };

      const response = await fetch(`api/currentUser`, fetchOptions());
      const data = await response.json();

      setUserdetails(data[0]);
      setIsLoading(false);
    }
    getUserInfo();
  }, []);

  return (
    <section className="userinfo-section">
      {isLoading ? (
        <div className="loading">
          <div className="loading-inner"></div>
        </div>
      ) : (
        <UserDetails userinfo={userdetails} />
      )}
    </section>
  );
}

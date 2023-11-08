import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
import { UserBookings } from "../../components/UserBooking/UserBookings"
import { fetchHelper } from "../../utils/fetchHelper";

export function MyAccountPage() {
    const [userInfo, setUserInfo] = useState([]);
    const [setToken] = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserInfo() {
            const response = await fetchHelper("/currentUser", "get")
            const data = await response.json();
            setUserInfo(data)
        }
        getUserInfo();
    }, []);

    function handleClick() {
        setToken(undefined)
        navigate("/")
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
                    {userInfo.length > 0 ? (
                        <section className="my-account-info">
                        <h2>Hej, {userInfo[0].fname}!</h2>
                        <p>First Name: {userInfo[0].fname}</p>
                        <p>Last Name: {userInfo[0].lname}</p>
                        <p>Email: {userInfo[0].email}</p>
                        <p>Phone Number: {userInfo[0].phone}</p>
                        </section>
                    ) : (
                        <p>Loading user information...</p>
                    )}
                    <UserBookings />
                </div>
            </div>
        </>
    )
}
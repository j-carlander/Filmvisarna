import { useNavigate, useOutletContext } from "react-router-dom"
import { UserBookings } from "../../components/UserBooking/UserBookings"

export function MyAccountPage() {
    const [token, setToken] = useOutletContext();

    const navigate = useNavigate();
    const handleClick = () => {
        setToken(undefined)
        navigate("/")
        console.log(token)
    }
    return (
        <>
            <div className="my-account-wrapper">
                <div className="my-account-logout">
                    <button className="my-account-logout-btn" onClick={handleClick}>
                        Logga ut
                    </button>
                </div>
                <div className="my-account-content">
                    <h1>Min Sida</h1>
                    <UserBookings />
                </div>
            </div>
        </>
    )
}
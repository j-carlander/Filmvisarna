import { useNavigate, useOutletContext } from "react-router-dom";

export function AccountIcon() {
    const navigate = useNavigate();

    const isAuthenticated = useOutletContext();

    const handleClick = () => {
        if (isAuthenticated) {
            navigate("/test")
        } else {
            navigate("/login")
        }
    }

    return (
        <button className="myaccount-btn" onClick={handleClick}>
            <img src="/myaccount.svg" alt="Mitt Konto" />
        </button>
    );
}
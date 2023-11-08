import { useNavigate } from "react-router-dom";
import sessionService from "../../utils/sessionService";

export function AccountIcon() {
  const navigate = useNavigate();
  const token = sessionService.getToken();

  const handleClick = () => {
    if (token) {
      navigate("/myaccount");
    } else {
      navigate("/login");
    }
  };

  return (
    <button className="myaccount-btn" onClick={handleClick}>
      {token ? "Min sida " : "Logga in"}
      <img src="/myaccount.svg" alt="Mitt Konto" />
    </button>
  );
}

import { useNavigate } from "react-router-dom";
import sessionService from "../../utils/sessionService";

export function AccountIcon() {
  const navigate = useNavigate();
  const token = sessionService.getToken();

  const handleClick = () => {
    console.log(token)
    if (token !== null) {
      navigate("/myaccount");
    } else {
      navigate("/login");
    }
  };

  return (
    <button className="myaccount-btn" onClick={handleClick}>
      <img src="/myaccount.svg" alt="Mitt Konto" />
    </button>
  );
}

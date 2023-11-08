import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const setToken = useOutletContext()[1];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inloggning lyckades!", data);
        setToken(data.token);
        navigate(-1)
      } else {
        console.error("Inloggning misslyckades");
      }
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <form>
          <div className="form-control">
            <input
              placeholder="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <input
              placeholder="Lösenord"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="Login-btn" onClick={handleSubmit}>
            Logga in
          </button>
          <p className="bli-medlem">
            Inget konto?{" "}
            <span
              className="bli-medlem-underline"
              onClick={() => {
                navigate("/register");
              }}>
              Bli medlem!
            </span>
          </p>
          <button className="abort-btn">Avbryt</button>
        </form>
      </div>
    </>
  );
}

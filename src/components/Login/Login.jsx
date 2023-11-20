import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const setToken = useOutletContext()[1];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

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

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        navigate(-1);
      } else {
        setServerError(data.error);
        console.error("Inloggning misslyckades");
      }
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  }

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} onReset={() => navigate(-1)}>
        <div className="form-wrapper">
          <div className="form-control">
            <input
              required
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <input
              required
              placeholder="Lösenord"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="Login-btn" type="submit">
            Logga in
          </button>
          <p className="server-error">{serverError}</p>
          <div className="img-container">
            <img className="Projector" src="/Projektor.png" />
            <img className="klappa" src="/Klappa.png" />
          </div>
          <p className="bli-medlem">
            Inget konto?{" "}
            <span
              className="bli-medlem-underline"
              onClick={() => {
                navigate("/registrera");
              }}>
              Bli medlem!
            </span>
          </p>
          <button className="abort-btn" type="reset">
            Avbryt
          </button>
        </div>
        </form>
      </div>
    </>
  );
}
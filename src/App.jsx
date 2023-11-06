import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
<<<<<<< HEAD
// import Login from "./components/Login/Login";
=======
import sessionService from "./utils/sessionService";

>>>>>>> dev
function App() {
  const [token, setUserToken] = useState(undefined);

  const [matchDesktop, setMatchDesktop] = useState(
    window.matchMedia("(min-width: 1000px)")
  );

  function setToken(newToken) {
    if (newToken === undefined) {
      sessionService.clearSession();
    } else {
      sessionService.setToken(newToken);
    }
    setUserToken(newToken);
  }

  useEffect(() => {
    const foundToken = sessionService.getToken();

    if (foundToken !== null) {
      setToken(foundToken);
    }

    const mediaQuery = window.matchMedia("(min-width: 1000px)");
    mediaQuery.addEventListener("change", setMatchDesktop);

    return () => mediaQuery.removeEventListener("change", setMatchDesktop);
  }, []);

  return (
    <>
      <Header matchDesktop={matchDesktop} />
      <main className="max-width-wrapper">
        <Outlet context={[token, setToken]} />
      </main>
      <Footer />
      {/* <Login /> */}
    </>
  );
}

export default App;


import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
// import Login from "./components/Login/Login";
function App() {
  const [matchDesktop, setMatchDesktop] = useState(
    window.matchMedia("(min-width: 1000px)")
  );
   const [selectedSeats, setSelectedSeats] = useState([]);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1000px)");
    mediaQuery.addEventListener("change", setMatchDesktop);

    return () => mediaQuery.removeEventListener("change", setMatchDesktop);
  }, []);

  return (
    <>
      <Header matchDesktop={matchDesktop} />
      <main className="max-width-wrapper">
      <Outlet context={[selectedSeats, setSelectedSeats]}/>
      </main>
      <Footer />
      {/* <Login /> */}
    </>
  );
}


export default App;

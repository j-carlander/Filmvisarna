
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [matchDesktop, setMatchDesktop] = useState(
    window.matchMedia("(min-width: 1000px)")
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1000px)");
    mediaQuery.addEventListener("change", setMatchDesktop);

    return () => mediaQuery.removeEventListener("change", setMatchDesktop);
  }, []);

  return (
    <>
      <Header matchDesktop={matchDesktop} />
      <main className="max-width-wrapper">
      <Outlet />
      </main>
      <Footer />
    </>
  );
}


export default App;

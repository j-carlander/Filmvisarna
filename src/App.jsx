import "./App.css";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { useState } from "react";
import { useEffect } from "react";

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
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <NavBar matchDesktop={matchDesktop} />
        <SearchBar matchDesktop={matchDesktop} />
      </header>
      <Outlet />
    </>
  );
}

export default App;

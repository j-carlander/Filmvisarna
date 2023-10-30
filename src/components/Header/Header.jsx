import { useLocation } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { SearchBar } from "../SearchBar/SearchBar";

export function Header({ matchDesktop }) {
  const location = useLocation();
  console.log("location: ", location);
  return (
    <>
      {location.pathname === "/" ? (
        <div className="logo-container">
          <img src="/Logo.svg" alt="Logo" className="logo-img" />
        </div>
      ) : null}
      <header className="page-header">
        <NavBar matchDesktop={matchDesktop} />
        <SearchBar matchDesktop={matchDesktop} />
      </header>
    </>
  );
}

import { useLocation } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { SearchBar } from "../SearchBar/SearchBar";
import { AccountIcon } from "../AccountIcon/AccountIcon";

export function Header({ matchDesktop }) {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <div className="logo-container">
          <img src="/Logo.svg" alt="Logo" className="logo-img" />
        </div>
      ) : null}
      <header className="page-header">
        <div className="max-width-wrapper">
          <NavBar matchDesktop={matchDesktop} />
          <div className="search-and-account">
            <SearchBar matchDesktop={matchDesktop} />
            <AccountIcon className="AccountIcon" matchDesktop={matchDesktop} />
          </div>  
        </div>
      </header>
    </>
  );
}

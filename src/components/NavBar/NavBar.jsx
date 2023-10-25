import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { pages } from "../../main";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { DesktopMenu } from "./DesktopMenu/DesktopMenu";

export function NavBar() {
  const [matchDesktop, setMatchDesktop] = useState(
    window.matchMedia("(min-width: 1000px)")
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1000px)");
    mediaQuery.addEventListener("change", setMatchDesktop);

    return () => mediaQuery.removeEventListener("change", setMatchDesktop);
  }, []);

  return (
    <nav className="main-nav-bar">
      {!matchDesktop.matches ? <BurgerMenu pages={pages} /> : null}
      <NavLink to={"/"}>
        <img src="/home.svg" />
      </NavLink>
      {matchDesktop.matches ? <DesktopMenu pages={pages} /> : null}
    </nav>
  );
}

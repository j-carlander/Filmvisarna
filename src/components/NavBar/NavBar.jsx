/**
 * Component for navigation bar
 * Different menu options based on the screen size
 * (burger menu for smaller screens and a desktop menu for larger screens)
 */

import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { pages } from "../../main";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { DesktopMenu } from "./DesktopMenu/DesktopMenu";

export function NavBar({ matchDesktop }) {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const location = useLocation();

  useEffect(() => {
    function onWindowScroll() {
      setScrollY(window.scrollY);
    }

    window.onscroll = onWindowScroll;

    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <nav className="main-nav-bar">
      {!matchDesktop.matches ? <BurgerMenu pages={pages} /> : null}
      {location.pathname === "/" && scrollY < 250 ? null : (
        <NavLink to={"/"}>
          <img className="logo-mini-img" src="/logo-mini.png" />
        </NavLink>
      )}
      {matchDesktop.matches ? <DesktopMenu pages={pages} /> : null}
    </nav>
  );
}

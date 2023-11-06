import { NavLink } from "react-router-dom";
import { pages } from "../../main";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { DesktopMenu } from "./DesktopMenu/DesktopMenu";

export function NavBar({ matchDesktop }) {
  return (
    <nav className="main-nav-bar">
      {!matchDesktop.matches ? <BurgerMenu pages={pages} /> : null}
      <NavLink to={"/"}>
        <img className="logo-mini-img" src="/logo-mini.png" />
      </NavLink>
      {matchDesktop.matches ? <DesktopMenu pages={pages} /> : null}
    </nav>
  );
}

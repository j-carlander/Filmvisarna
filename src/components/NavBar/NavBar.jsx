import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBar() {
  // TODO: For future use, when sign in and register is implemented
  //   const [signedIn, setSignedIn] = useState(false);
  //   const signInLink = <NavLink>Logga in</NavLink>;
  //   const signOutLink = <NavLink>Logga ut</NavLink>;

  // const becomeMemberLink = <NavLink to={'/register'}>Bli medlem</NavLink>;
  // const myPageLink = <NavLink to={'/mypage'}>Min sida</NavLink>;

  const [matchDesktop, setMatchDesktop] = useState(
    window.matchMedia("(min-width: 1000px)")
  );
  const [showMenu, setShowMenu] = useState(false);

  const burgerMenuRef = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1000px)");
    mediaQuery.addEventListener("change", setMatchDesktop);

    return () => mediaQuery.removeEventListener("change", setMatchDesktop);
  }, []);

  useEffect(() => {
    const menuRef = burgerMenuRef.current;
    if (showMenu) {
      menuRef.show();
    } else {
      menuRef.close();
    }

    return () => menuRef.close();
  }, [showMenu]);

  return (
    <nav className="main-nav-bar">
      {!matchDesktop.matches ? (
        <div>
          <button
            onClick={() => {
              setShowMenu(true);
            }}>
            <img src="/hamburger_menu.svg" />
          </button>
          {showMenu ? (
            <div
              className="menu-backdrop"
              onClick={() => setShowMenu(false)}></div>
          ) : null}
          <dialog ref={burgerMenuRef} onClick={(e) => console.log(e)}>
            <button
              onClick={() => {
                setShowMenu(false);
              }}>
              <img src="/close.svg" />
            </button>
            <ul>
              <li>
                <NavLink to={"/"}>Hem</NavLink>
              </li>
              <li>
                <NavLink to={"/movies"}>Filmer</NavLink>
              </li>
              {/* <li>
                  <NavLink to={"/aboutus"}>Om oss</NavLink>
                </li>
                 <li>{signedIn ? myPageLink : becomeMemberLink}</li>
                <li>{signedIn ? signOutLink : signInLink}</li> */}
            </ul>
          </dialog>
        </div>
      ) : null}
      <NavLink to={"/"}>
        <img src="/home.svg" />
      </NavLink>
      {matchDesktop.matches ? (
        <ul>
          <li>
            <NavLink to={"/movies"}>Filmer</NavLink>
          </li>
          {/* <li>
          <NavLink to={"/aboutus"}>Om oss</NavLink>
        </li>
         <li>{signedIn ? myPageLink : becomeMemberLink}</li>
        <li>{signedIn ? signOutLink : signInLink}</li> */}
        </ul>
      ) : null}
    </nav>
  );
}

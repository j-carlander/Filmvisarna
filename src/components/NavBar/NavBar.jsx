// import { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBar() {
  // TODO: For future use, when sign in and register is implemented
  //   const [signedIn, setSignedIn] = useState(false);
  //   const signInLink = <NavLink>Logga in</NavLink>;
  //   const signOutLink = <NavLink>Logga ut</NavLink>;

  // const becomeMemberLink = <NavLink to={'/register'}>Bli medlem</NavLink>;
  // const myPageLink = <NavLink to={'/mypage'}>Min sida</NavLink>;
  return (
    <nav>
      <NavLink to={"/"}>
        <img src="/home.svg" />
      </NavLink>
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
    </nav>
  );
}

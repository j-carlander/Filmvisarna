import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="footer">
    <footer className="max-width-wrapper">
      <div className="top-footer">
        <h2 className="title-footer">Filmvisarna</h2>
        <p>Adressen 8, 123 45</p>
        <p>Nr: 011-111 22 33</p>
        <p className="mail">Filmvisarna@mejl.com</p>
        <Link to="./aboutus#find-us" className="link-no-style">Hitta hit</Link>
      </div>
      <div className="bottom-footer">
        <h2 className="title-socials">Följ oss på sociala medier</h2>
        <div className="socials-icon">
            <img src="/Instagram.png"/>
            <img src="/Facebook.png"/>
            <img src="/X.png"/>
        </div>
      </div>
      <p className="copyright">© 2023 Filmvisarna</p>
    </footer>
    </div>
  );
}

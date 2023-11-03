import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

export function AboutUs() {
  const location = useLocation();
  const findRef = useRef();
  const contactRef = useRef();
  const aboutRef = useRef();

  useEffect(() => {
    if (findRef.current === undefined) return;
    if (contactRef.current === undefined) return;
    if (location.hash === "#find-us") {
      findRef.current.scrollIntoView();
    } else if (location.hash === "#contact") {
      contactRef.current.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [findRef, location, contactRef]);
  return (
    <div className="about-us-page" ref={aboutRef}>
      <h1>Om oss</h1>
      <p className="text">
        Välkommen till vår lilla pärla av en biograf i hjärtat av vår älskade
        stad. Hos oss får du den perfekta bioupplevelsen i en intim och mysig
        atmosfär. Med två bekväma salonger har vi valt att bevara det lilla
        formatet för att ge dig en personlig och nära upplevelse.
      </p>
      <p className="text">
        Våra moderna salonger är utrustade med det senaste inom ljud- och
        bildteknik, och vi visar de senaste filmerna från hela världen. Oavsett
        om du är en äkta filmälskare eller bara söker en trevlig kväll med
        familj och vänner, så är vår biograf det perfekta valet.
      </p>
      <p className="text">
        Vår personal är passionerad och engagerad när det kommer till film, och
        de ser till att din vistelse hos oss blir minnesvärd. Njut av din
        favoritfilm med popcorn och dina favoritdrycker från vår lobbykiosk.
      </p>
      <p className="text">
        Ge dig själv den där extra uppmärksamheten och kvaliteten som en liten
        stad kan erbjuda. Vi ser fram emot att välkomna dig till vår biograf för
        en filmupplevelse som du sent kommer att glömma. Kom och upptäck det
        magiska i att gå på bio hos oss!
      </p>
      <img className="theatre-img" src="/movie-theatre.png" />
      <h2 ref={contactRef} id="contact">
        Kontakt
      </h2>
      <p className="contact-info">
        <span>
          Adress: <span>Adressen 8, 123 45</span>
        </span>
        <span>
          Email: <span>Filmvisarna@mejl.com</span>
        </span>
        <span>
          Tel: <span>011-111 22 33</span>
        </span>
      </p>
      <h3 ref={findRef} id="find-us">
        <img src="/map-outline.svg" />
        Hitta hit
      </h3>
      <iframe
        className="map-frame"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4070.019852453792!2d18.037506508598234!3d59.332788104385074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ssv!2sse!4v1698661872601!5m2!1ssv!2sse"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}

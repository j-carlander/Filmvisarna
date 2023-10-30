export function AboutUs() {
  return (
    <div className="about-us-page">
      <h1>Om oss</h1>
      <p className="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <img className="theatre-img" src="/movie-theatre.png" />
      <h2>Kontakt</h2>
      <p className="contact-info">
        <span>
          Adress: <span>Adressen 8, 123 45</span>
        </span>
        <span>
          Email: <span>kontakt@filmvisarna.se</span>
        </span>
        <span>
          Tel: <span>123 45 67 89</span>
        </span>
      </p>
      <h3 id="find-us">
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

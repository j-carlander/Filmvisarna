# Projekt: Filmvisarna

Företaget Filmvisarna AB är en liten biografkedja som vill börja konkurrera lokalt med SF. De har ett par biografsalonger i Småstad och har säkrat rättigheter att visa ett antal olika filmtitlar.

Nu behöver de hjälp att bygga en första version av sin webbsajt, där besökarna ska kunna:

Få information om filmer som visas, inkl. datum och tider.
Se trailers för filmerna
Boka sina biobiljetter online - och få reda på totalpris, placeringar (rad och stolsnr) samt bokningsnummer.
Filmvisarna AB vill gärna ha ett bokningssystem där man kan se en grafisk skiss av biosalongerna och dess stolar. Man ska kunna boka ett antal intilliggande stolar för sitt sällskap vid en specifik visning av en film. Initialt ska de bästa kvarvarande stolarna markeras, men besökaren ska kunna ändra valet.

Medan man bokar ska man kunna välja antal besökare och se totalpriset. Man ska när man slutför en bokning få ett unikt bokningsnummer (som inte ska gå att gissa på något enkelt sätt), samt kunna se vilken/vilka rader och stolar man bokat.

Än så länge behöver man inte kunna betala online - utan betalning detta sker i samband med att man anländer till biografen och ger sitt bokningsnummer för personalen.

Observera! Pensionärer och barn (under 12 år) har lägre biljettpris. Normalt biljettpris är 140 kr, för pensionärer 120 kr och för barn 80 kr.

Salongernas stolar är numrerade från höger till vänster, framifrån och bakåt. (Stolen längst fram till höger har nummer 1. Om salongen har 100 stolar har den längst bak till vänster nummer 100.)

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

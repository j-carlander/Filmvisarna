# Filmvisarna

## Versionshantering

- Huvudbranches main och dev
  - main - låst, 2 godkännanden
  - dev - låst ett godkännande
- Bryt ut egen branch från dev för featuren/komponenten ni ska bygga
- När klar med sin feature
  1. kören en pull på dev så senaste.
  2. mergea in dev i din feature och lös conflicts och kontrollera att det fortfarande fungerar
  3. push to origin och skapa pull request till dev
  4. annan medlem i gruppen behöver godkänna merge till dev

## Kodstandard

- Funktioner deklareras med 'function' ex. `js function greeting(){return 'Hello!'} `
- Arrowfunction ok i "inline-kodning" ex. `js array.map(() => {}) `

## Styling

- Responsiv design, mobile first
- Responsiv design även i tablet? Anpassa vid behov
- SCSS

## Filstruktur

- För en component heter mappen och filerna samma sak med stor bokstav i början (SCSS fil och js fil)
- I pages ska mapparna och filerna heta samma sak och ha stor bokstav i början
- JSX: stor bokstav
- Vanliga funktioner: camelcase (liten bokstav i början)

## Möten

- Standup-möte kl 8.30, i discord utom lektionsdagar (måndag och torsdag) då i zoom

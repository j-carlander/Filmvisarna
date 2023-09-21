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

- funktioner deklareras med 'function' ex. `js function greeting(){return 'Hello!'} `
- arrowfunction ok i "inline-kodning" ex. `js array.map(() => {}) `

### Typescript

- använda interface för object och inte type alias
- inte ta med ordet interface i interfacenamnet

## Möten

- Standup-möte kl 8.30, i discord utom lektionsdagar (måndag och torsdag) då i zoom

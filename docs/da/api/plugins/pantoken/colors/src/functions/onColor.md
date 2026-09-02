[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / onColor

# Funktion: onColor()

> **onColor**(`surface`, `threshold?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Den læselige forgrund — sort eller hvid — for indhold placeret *på* `surface`. Dette er CSS-kun
formen for InstUI's tilbagevendende `*-on-color` varianter (en fokusring på en brand-knap, en
primær-invers knaps tekst, et ikon på en farvet overflade): snarere end et fast omvendt token,
det vælger kontrasten fra selve overfladen, så det forbliver korrekt, når overfladen ændres.

Det læser overfladens OKLCH-lysstyrke gennem relativ farvesyntaks og sætter det til `0` (sort) eller
`1` (hvid) på `threshold` ved hjælp af `calc(… * infinity)` clamp-tricket — ingen JS, ingen fast hex.

## Parametre

### surface

`string`

Baggrundfarven, som indholdet sætter sig på (bogstavelig, `var(--token)`, eller en indlejret hjælper).

### threshold?

`number` = `0.62`

OKLCH-lysstyrke (0–1), over hvilken overfladen tælles som "lys" (standard `0.62`).

## Returnerer

`string`

Et `oklch(from …)` udtryk, der løses til sort eller hvid.

## Eksempel

```ts
onColor("var(--instui-color-background-brand)"); // white on a dark brand surface, black on a light one
// → "oklch(from var(--…-brand) clamp(0, (0.62 - l) * infinity, 1) 0 0)"
```

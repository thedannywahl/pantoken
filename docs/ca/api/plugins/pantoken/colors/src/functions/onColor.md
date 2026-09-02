[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / onColor

# Funció: onColor()

> **onColor**(`surface`, `threshold?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El primer pla llegible — negre o blanc — per al contingut col·locat *en* `surface`. Aquesta és la forma només CSS de les variants recurrents `*-on-color` d'InstUI (un anell de focus en un botó de marca, el text d'un botó invers primari, una icona en una superfície colorida): en lloc d'un token invers fix, tria el contrast de la pròpia superfície, de manera que es manté correcte a mesura que la superfície canvia.

Llegeix la lluminositat OKLCH de la superfície mitjançant sintaxi de color relatiu i l'alinea a `0` (negre) o `1` (blanc) a `threshold` utilitzant el truc de pinça `calc(… * infinity)` — sense JS, sense hexadecimal fix.

## Paràmetres

### surface

`string`

El color de fons en el qual s'assenta el contingut (literal, `var(--token)`, o un ajudant imbricat).

### threshold?

`number` = `0.62`

Lluminositat OKLCH (0–1) per sobre de la qual la superfície compta com "clara" (per defecte `0.62`).

## Retorna

`string`

Una expressió `oklch(from …)` que es resol a negre o blanc.

## Exemple

```ts
onColor("var(--instui-color-background-brand)"); // white on a dark brand surface, black on a light one
// → "oklch(from var(--…-brand) clamp(0, (0.62 - l) * infinity, 1) 0 0)"
```

[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Funktion: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Byg pantoken-stilarket til et tema (med valgfrit plugin CSS). Eksponeret til direkte brug.

## Parametre

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Returnerer

`string`

CSS-strengen.

## Eksempel

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

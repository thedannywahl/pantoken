[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Funció: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Construeix l'full d'estils de pantoken per a un tema (amb CSS del plugin opcional). Exposat per a ús directe.

## Paràmetres

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Retorna

`string`

La cadena CSS.

## Exemple

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

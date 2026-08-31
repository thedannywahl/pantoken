[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Function: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Construeix l'full d'estils de pantoken per a un tema (amb CSS del plugin opcional). Exposat per a ús directe.

## Parameters

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Returns

`string`

La cadena CSS.

## Example

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

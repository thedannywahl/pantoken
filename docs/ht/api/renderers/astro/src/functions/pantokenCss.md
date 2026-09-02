[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Fonksyon: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Paramèt

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Retounen

`string`

The CSS string.

## Egzanp

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

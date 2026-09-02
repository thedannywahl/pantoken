[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Funzione: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Parametri

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Restituisce

`string`

The CSS string.

## Esempio

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

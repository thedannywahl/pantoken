[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Feidhm: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ailfha</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Paraiméadair

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Tuairisceáin

`string`

The CSS string.

## Sampla

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

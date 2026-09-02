[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Fall: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Færibreytur

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Skilar

`string`

The CSS string.

## Dæmi

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Swyddogaeth: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Paramedrau

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Yn dychwelyd

`string`

The CSS string.

## Enghraifft

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

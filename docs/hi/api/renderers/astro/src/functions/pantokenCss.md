[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# फंक्शन: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## पैरामीटर

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## वापसी

`string`

The CSS string.

## उदाहरण

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# פונקציה: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">אלפא</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## פרמטרים

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## מחזיר

`string`

The CSS string.

## דוגמה

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Fušla: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Parametera

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Gullii / Gávdnat

`string`

The CSS string.

## Exempel

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

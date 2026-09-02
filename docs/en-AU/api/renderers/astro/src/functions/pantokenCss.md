[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Function: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Parameters

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Returns

`string`

The CSS string.

## Example

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

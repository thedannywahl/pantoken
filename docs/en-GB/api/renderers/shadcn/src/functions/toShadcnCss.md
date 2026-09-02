[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Function: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Parameters

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Returns

`string`

The bridging CSS string.

## Example

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Function: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emetre el pont de variable CSS shadcn → Instructure.

## Parameters

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Returns

`string`

La cadena CSS de connexió.

## Example

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

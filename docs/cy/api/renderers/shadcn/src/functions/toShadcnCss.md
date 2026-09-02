[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Swyddogaeth: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Paramedrau

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Yn dychwelyd

`string`

The bridging CSS string.

## Enghraifft

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Fall: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Færibreytur

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Skilar

`string`

The bridging CSS string.

## Dæmi

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

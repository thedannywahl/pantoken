[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Fušla: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Parametera

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Gullii / Gávdnat

`string`

The bridging CSS string.

## Exempel

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

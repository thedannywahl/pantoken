[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Fonksyon: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Paramèt

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Retounen

`string`

The bridging CSS string.

## Egzanp

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

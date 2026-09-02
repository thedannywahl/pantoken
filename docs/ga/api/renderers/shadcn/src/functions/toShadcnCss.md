[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Feidhm: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Paraiméadair

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Tuairisceáin

`string`

The bridging CSS string.

## Sampla

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

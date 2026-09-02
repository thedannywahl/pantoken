[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Fonksiyon: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Parametreler

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Döndürür

`string`

The bridging CSS string.

## Örnek

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

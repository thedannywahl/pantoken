[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Hàm: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Tham số

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Trả về

`string`

The bridging CSS string.

## Ví dụ

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

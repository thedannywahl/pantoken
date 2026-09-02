[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# تابع: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Emit the shadcn → Instructure CSS-variable bridge.

## پارامترها

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## مقدار بازگشتی

`string`

The bridging CSS string.

## نمونه

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

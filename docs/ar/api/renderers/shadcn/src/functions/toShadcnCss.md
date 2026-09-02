[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# دالة: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أصدر جسر shadcn → Instructure لـ CSS-variable.

## المعلمات

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## القيم المرجعة

`string`

سلسلة CSS الخاصة بالجسر.

## مثال

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

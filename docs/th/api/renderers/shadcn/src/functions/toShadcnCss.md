[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# ฟังก์ชัน: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Emit the shadcn → Instructure CSS-variable bridge.

## พารามิเตอร์

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## คืนค่า

`string`

The bridging CSS string.

## ตัวอย่าง

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```

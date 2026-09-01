[pantoken](../../../../index.md) / [renderers/bootstrap/src](../index.md) / toBootstrapCss

# دالة: toBootstrapCss()

> **toBootstrapCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إخراج جسر متغيرات CSS من Bootstrap إلى Instructure.

## المعلمات

### options?

[`ToBootstrapCssOptions`](../interfaces/ToBootstrapCssOptions.md) = `{}`

[ToBootstrapCssOptions](../interfaces/ToBootstrapCssOptions.md).

## القيم المرجعة

`string`

سلسلة CSS الخاصة بالجسر.

## أمثلة

**الجسر الافتراضي لـ :root**

```ts
import { toBootstrapCss } from "@pantoken/bootstrap";

const css = toBootstrapCss();
// ":root { --bs-primary: var(--instui-color-background-brand); … }"
```

**قصر النطاق على سمة theme في Bootstrap**

```ts
import { toBootstrapCss } from "@pantoken/bootstrap";

const css = toBootstrapCss({ selector: "[data-bs-theme]" });
```

[pantoken](../../../../index.md) / [renderers/docusaurus/src](../index.md) / toDocusaurusCss

# دالة: toDocusaurusCss()

> **toDocusaurusCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إخراج جسر متغيرات CSS من Infima → Instructure.

## المعلمات

### options?

[`ToDocusaurusCssOptions`](../interfaces/ToDocusaurusCssOptions.md) = `{}`

[ToDocusaurusCssOptions](../interfaces/ToDocusaurusCssOptions.md).

## القيم المرجعة

`string`

سلسلة CSS الخاصة بالجسر.

## مثال

```ts
import { toDocusaurusCss } from "@pantoken/docusaurus";

const css = toDocusaurusCss();
// ":root { --ifm-color-primary: var(--instui-color-background-brand); … }"
// Write it into src/css/custom.css alongside @pantoken/css.
```

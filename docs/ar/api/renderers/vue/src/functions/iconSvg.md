[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / iconSvg

# دالة: iconSvg()

> **iconSvg**(`name`, `resolve?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

حل اسم أيقونة إلى SVG مضمّن (سلسلة فارغة إذا كان غير معروف). نقِي — يقوم العنصر بعرضها.

## المعلمات

### name

`string`

اسم الأيقونة (مثال `arrow-left`).

### resolve?

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

المُحلّل (افتراضيًا إلى مجموعة أيقونات pantoken المضمّنة).

## القيم المرجعة

`string`

## مثال

```ts
import { iconSvg } from "@pantoken/web-components";

const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
```

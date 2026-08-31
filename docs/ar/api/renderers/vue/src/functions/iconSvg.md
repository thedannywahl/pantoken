[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / iconSvg

# Function: iconSvg()

> **iconSvg**(`name`, `resolve?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

حل اسم أيقونة إلى SVG مضمن (سلسلة فارغة عند عدم معرفتها). خالصة — العنصر يعيد تصييره.

## Parameters

### name

`string`

اسم الأيقونة (على سبيل المثال `arrow-left`).

### resolve?

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

المحلل (الافتراضي هو مجموعة أيقونات pantoken المدمجة).

## Returns

`string`

## Example

```ts
import { iconSvg } from "@pantoken/web-components";

const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
```

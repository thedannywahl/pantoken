[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# دالة: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء ملف أنماط دليل Pendo.

## المعلمات

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## القيم المرجعة

`string`

ملف CSS المركّب.

## أمثلة

**البناء الافتراضي لإعادة العلامة التجارية (محدود النطاق، !important، مقتَصّ)**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss();
```

**سمة Canvas، غير مقيّدة النطاق، احتفظ بمجموعة الرموز كاملة**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss({ theme: "canvas", scope: false, prune: false });
```

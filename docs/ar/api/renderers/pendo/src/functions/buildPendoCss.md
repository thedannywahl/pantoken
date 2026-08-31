[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# Function: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء ورقة أنماط دليل Pendo.

## Parameters

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## Returns

`string`

CSS المؤلفة.

## Examples

**بناء إعادة العلامة التجارية الافتراضي (نطاق، !important، محذوف)**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss();
```

**موضوع Canvas، بدون نطاق، احتفظ بمجموعة الرمزات الكاملة**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss({ theme: "canvas", scope: false, prune: false });
```

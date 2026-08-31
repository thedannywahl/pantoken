[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toXcodeImageset

# Function: toXcodeImageset()

> **toXcodeImageset**(`name`, `svg`): [`AssetFile`](../interfaces/AssetFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء الملفات لمجموعة صور فهرس أصول Xcode التي تحتوي على SVG (مع الحفاظ على المتجه، لذا
يتم تحجيمها وصبغتها على iOS 13+). إرجاع `.svg` و`Contents.json`.

## Parameters

### name

`string`

اسم الرمز (اسم مجلد imageset).

### svg

`string`

علامات SVG مضمنة.

## Returns

[`AssetFile`](../interfaces/AssetFile.md)[]

ملفات imageset، المسارات بالنسبة إلى جذر `.xcassets`.

## Example

```ts
import { toXcodeImageset } from "@pantoken/core";

const files = toXcodeImageset("arrow-left", "<svg viewBox='0 0 24 24'/>");
// → [
//   { path: "arrow-left.imageset/arrow-left.svg", content: "<svg…" },
//   { path: "arrow-left.imageset/Contents.json", content: "{…preserves-vector-representation…}" },
// ]
```

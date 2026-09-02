[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toXcodeImageset

# دالة: toXcodeImageset()

> **toXcodeImageset**(`name`, `svg`): [`AssetFile`](../interfaces/AssetFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء الملفات لمجموعة صور في كتالوج الأصول Xcode التي تحتوي على SVG (مع الحفاظ على المتجهات، بحيث
تتكيف وتُلوَّن على iOS 13+). يعيد `.svg` و `Contents.json`.

## المعلمات

### name

`string`

اسم الأيقونة (اسم مجلد imageset).

### svg

`string`

ترميز SVG مضمّن.

## القيم المرجعة

[`AssetFile`](../interfaces/AssetFile.md)[]

ملفات imageset، المسارات نسبية إلى جذر `.xcassets`.

## مثال

```ts
import { toXcodeImageset } from "@pantoken/core";

const files = toXcodeImageset("arrow-left", "<svg viewBox='0 0 24 24'/>");
// → [
//   { path: "arrow-left.imageset/arrow-left.svg", content: "<svg…" },
//   { path: "arrow-left.imageset/Contents.json", content: "{…preserves-vector-representation…}" },
// ]
```

[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toXcodeImageset

# 函式: toXcodeImageset()

> **toXcodeImageset**(`name`, `svg`): [`AssetFile`](../interfaces/AssetFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Build the files for an Xcode asset-catalog imageset holding an SVG (with vector preservation, so
it scales and tints on iOS 13+). Returns the `.svg` and its `Contents.json`.

## 參數

### name

`string`

The icon name (imageset folder name).

### svg

`string`

Inline SVG markup.

## 回傳

[`AssetFile`](../interfaces/AssetFile.md)[]

The imageset's files, paths relative to the `.xcassets` root.

## 範例

```ts
import { toXcodeImageset } from "@pantoken/core";

const files = toXcodeImageset("arrow-left", "<svg viewBox='0 0 24 24'/>");
// → [
//   { path: "arrow-left.imageset/arrow-left.svg", content: "<svg…" },
//   { path: "arrow-left.imageset/Contents.json", content: "{…preserves-vector-representation…}" },
// ]
```

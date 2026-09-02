[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toXcodeImageset

# Fonksyon: toXcodeImageset()

> **toXcodeImageset**(`name`, `svg`): [`AssetFile`](../interfaces/AssetFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build the files for an Xcode asset-catalog imageset holding an SVG (with vector preservation, so
it scales and tints on iOS 13+). Returns the `.svg` and its `Contents.json`.

## Paramèt

### name

`string`

The icon name (imageset folder name).

### svg

`string`

Inline SVG markup.

## Retounen

[`AssetFile`](../interfaces/AssetFile.md)[]

The imageset's files, paths relative to the `.xcassets` root.

## Egzanp

```ts
import { toXcodeImageset } from "@pantoken/core";

const files = toXcodeImageset("arrow-left", "<svg viewBox='0 0 24 24'/>");
// → [
//   { path: "arrow-left.imageset/arrow-left.svg", content: "<svg…" },
//   { path: "arrow-left.imageset/Contents.json", content: "{…preserves-vector-representation…}" },
// ]
```

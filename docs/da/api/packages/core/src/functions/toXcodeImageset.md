[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toXcodeImageset

# Function: toXcodeImageset()

> **toXcodeImageset**(`name`, `svg`): [`AssetFile`](../interfaces/AssetFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg filerne for et Xcode asset-catalog imageset med en SVG (med vektorbevarelse, så det skaleres og tintes på iOS 13+). Returnerer `.svg` og dets `Contents.json`.

## Parameters

### name

`string`

Ikonets navn (imageset-mappenavn).

### svg

`string`

Inline SVG-markup.

## Returns

[`AssetFile`](../interfaces/AssetFile.md)[]

Imageset-filerne, stier i forhold til `.xcassets` rodmappen.

## Example

```ts
import { toXcodeImageset } from "@pantoken/core";

const files = toXcodeImageset("arrow-left", "<svg viewBox='0 0 24 24'/>");
// → [
//   { path: "arrow-left.imageset/arrow-left.svg", content: "<svg…" },
//   { path: "arrow-left.imageset/Contents.json", content: "{…preserves-vector-representation…}" },
// ]
```

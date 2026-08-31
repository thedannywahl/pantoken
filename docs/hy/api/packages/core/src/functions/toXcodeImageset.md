[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toXcodeImageset

# Function: toXcodeImageset()

> **toXcodeImageset**(`name`, `svg`): [`AssetFile`](../interfaces/AssetFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Xcode asset-catalog imageset-ի համար ստանալ SVG պարունակող ֆայլերը (վեկտորային պահպանմամբ, որ
ի iOS 13+ վրա մեծ/փոքր դառնա և ներկվի): Վերադարձնում է `.svg` և նրա `Contents.json`:

## Parameters

### name

`string`

Պատկերակի անունը (imageset թղթապանակի անունը):

### svg

`string`

Ներկառուցյալ SVG նշում:

## Returns

[`AssetFile`](../interfaces/AssetFile.md)[]

Imageset-ի ֆայլերը, `.xcassets` root-ի նկատմամբ հարաբերական ուղիները:

## Example

```ts
import { toXcodeImageset } from "@pantoken/core";

const files = toXcodeImageset("arrow-left", "<svg viewBox='0 0 24 24'/>");
// → [
//   { path: "arrow-left.imageset/arrow-left.svg", content: "<svg…" },
//   { path: "arrow-left.imageset/Contents.json", content: "{…preserves-vector-representation…}" },
// ]
```

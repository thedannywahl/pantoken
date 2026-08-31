[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toXcodeImageset

# Function: toXcodeImageset()

> **toXcodeImageset**(`name`, `svg`): [`AssetFile`](../interfaces/AssetFile.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix els fitxers per a un conjunt d'imatges de catàleg de recursos Xcode que conté un SVG (amb preservació de vectors, per tant
escala i tintatges a iOS 13+). Retorna el `.svg` i el seu `Contents.json`.

## Parameters

### name

`string`

El nom de la icona (nom de la carpeta imageset).

### svg

`string`

Marcat SVG en línia.

## Returns

[`AssetFile`](../interfaces/AssetFile.md)[]

Els fitxers del conjunt d'imatges, camins relatius a l'arrel `.xcassets`.

## Example

```ts
import { toXcodeImageset } from "@pantoken/core";

const files = toXcodeImageset("arrow-left", "<svg viewBox='0 0 24 24'/>");
// → [
//   { path: "arrow-left.imageset/arrow-left.svg", content: "<svg…" },
//   { path: "arrow-left.imageset/Contents.json", content: "{…preserves-vector-representation…}" },
// ]
```

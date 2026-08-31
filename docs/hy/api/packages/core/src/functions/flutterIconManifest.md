[pantoken](../../../../index.md) / [packages/core/src](../index.md) / flutterIconManifest

# Function: flutterIconManifest()

> **flutterIconManifest**(`names`, `assetDir?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կառուցեք Flutter/Dart manifest icon asset paths-ի (համար `flutter_svg`): Զուգակցեք raw SVGs-ի հետ `assetDir`-ի տակ պատճենված:

## Parameters

### names

readonly `string`[]

Icon անվանումներ:

### assetDir?

`string` = `"assets/pantoken/icons"`

Asset directory, որտեղ SVGs-ը պատճենվել են (լռելյալ `assets/pantoken/icons`):

## Returns

`string`

Dart source հայտարարում `PanTokensIcons` class-ի asset-path հաստատունների:

## Examples

**Լռելյալ asset directory**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left", "check-mark"]);
// → class PanTokensIcons {
//     static const String arrowLeft = 'assets/pantoken/icons/arrow-left.svg';
//     static const String checkMark = 'assets/pantoken/icons/check-mark.svg';
//   }
```

**Գործվածական asset directory**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left"], "lib/icons");
// → static const String arrowLeft = 'lib/icons/arrow-left.svg';
```

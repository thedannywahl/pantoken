[pantoken](../../../../index.md) / [packages/core/src](../index.md) / flutterIconManifest

# Function: flutterIconManifest()

> **flutterIconManifest**(`names`, `assetDir?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء بيان Flutter/Dart من مسارات أصول الرموز (لـ `flutter_svg`). زوج مع SVGs الخام
منسوخ تحت `assetDir`.

## Parameters

### names

readonly `string`[]

أسماء الرموز.

### assetDir?

`string` = `"assets/pantoken/icons"`

دليل الأصول يتم نسخ SVGs إليه (افتراضي `assets/pantoken/icons`).

## Returns

`string`

مصدر Dart يعلن عن فئة `PanTokensIcons` من ثوابت مسار الأصول.

## Examples

**دليل الأصول الافتراضي**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left", "check-mark"]);
// → class PanTokensIcons {
//     static const String arrowLeft = 'assets/pantoken/icons/arrow-left.svg';
//     static const String checkMark = 'assets/pantoken/icons/check-mark.svg';
//   }
```

**دليل أصول مخصص**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left"], "lib/icons");
// → static const String arrowLeft = 'lib/icons/arrow-left.svg';
```

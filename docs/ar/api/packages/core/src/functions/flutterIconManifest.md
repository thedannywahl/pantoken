[pantoken](../../../../index.md) / [packages/core/src](../index.md) / flutterIconManifest

# دالة: flutterIconManifest()

> **flutterIconManifest**(`names`, `assetDir?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء ملف تعريف (manifest) لـ Flutter/Dart لمسارات أصول الأيقونات (لـ `flutter_svg`). اقترن مع ملفات SVG الخام
المنسوخة تحت `assetDir`.

## المعلمات

### names

للقراءة فقط `string`[]

أسماء الأيقونات.

### assetDir?

`string` = `"assets/pantoken/icons"`

دليل الأصول الذي تُنسخ إليه ملفات SVG (الافتراضي `assets/pantoken/icons`).

## القيم المرجعة

`string`

مصدر Dart يعلن فئة `PanTokensIcons` لثوابت مسارات الأصول.

## أمثلة

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

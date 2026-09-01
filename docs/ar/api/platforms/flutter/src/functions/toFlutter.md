[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / toFlutter

# دالة: toFlutter()

> **toFlutter**(`tokens`, `options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

يصدر Flutter Dart لتمثيل IR صريح للرموز. يعيد مسار الملف المكتوب.

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## القيم المرجعة

`Promise`\<`string`\>

## أمثلة

**إصدار IR لسمة محددة**

```ts
import { toFlutter } from "@pantoken/flutter";
import { byTheme } from "@pantoken/tokens";

const file = await toFlutter(byTheme("canvas"), { outDir: "./lib/tokens" });
// writes ./lib/tokens/pantokens.dart (class PanTokens { … })
```

**الوضع الداكن مع أصول أيقونات SVG وملف المانيفست**

```ts
import { toFlutter } from "@pantoken/flutter";
import { byTheme } from "@pantoken/tokens";

await toFlutter(byTheme("rebrand"), {
  outDir: "./lib/tokens",
  mode: "dark",
  className: "InstUITokens",
  icons: ["add", "check"], // copies SVGs + writes pantoken_icons.dart
});
```

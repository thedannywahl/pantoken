[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / toFlutter

# Function: toFlutter()

> **toFlutter**(`tokens`, `options`): `Promise`\<`string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إصدار Flutter Dart لـ IR علامة صريحة. يعيد مسار الملف المكتوب.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Returns

`Promise`\<`string`\>

## Examples

**إصدار IR لموضوع معين**

```ts
import { toFlutter } from "@pantoken/flutter";
import { byTheme } from "@pantoken/tokens";

const file = await toFlutter(byTheme("canvas"), { outDir: "./lib/tokens" });
// writes ./lib/tokens/pantokens.dart (class PanTokens { … })
```

**الوضع الداكن مع أصول رموز SVG والبيان**

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

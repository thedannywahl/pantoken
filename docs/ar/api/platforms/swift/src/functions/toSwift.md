[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / toSwift

# Function: toSwift()

> **toSwift**(`tokens`, `options`): `Promise`\<`string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

انبعاث Swift لـ IR رموز صريح.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Returns

`Promise`\<`string`\>

مسار ملف Swift المكتوب.

## Examples

**إصدار IR لموضوع معين**

```ts
import { toSwift } from "@pantoken/swift";
import { byTheme } from "@pantoken/tokens";

const file = await toSwift(byTheme("canvas"), { outDir: "./Sources/Tokens" });
// writes Tokens.swift (class PanTokens { … })
```

**الوضع الليلي باسم فئة مخصص وكتالوج أصول**

```ts
import { toSwift } from "@pantoken/swift";
import { byTheme } from "@pantoken/tokens";

await toSwift(byTheme("rebrand"), {
  outDir: "./Sources/Tokens",
  mode: "dark",
  className: "InstUITokens",
  icons: ["add", "check"], // also emits Icons.xcassets
});
```

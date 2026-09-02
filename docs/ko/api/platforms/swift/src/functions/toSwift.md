[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / toSwift

# 함수: toSwift()

> **toSwift**(`tokens`, `options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Emit Swift for an explicit token IR.

## 매개변수

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## 반환값

`Promise`\<`string`\>

The path of the written Swift file.

## 예제들

**Emit a specific theme's IR**

```ts
import { toSwift } from "@pantoken/swift";
import { byTheme } from "@pantoken/tokens";

const file = await toSwift(byTheme("canvas"), { outDir: "./Sources/Tokens" });
// writes Tokens.swift (class PanTokens { … })
```

**Dark mode with a custom class name and an asset catalog**

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

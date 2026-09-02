[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# 関数: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## パラメーター

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## 戻り値

`Promise`\<`string`\>

The path of the written Swift file.

## 例

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

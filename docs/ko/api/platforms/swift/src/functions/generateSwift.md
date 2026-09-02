[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# 함수: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## 매개변수

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## 반환값

`Promise`\<`string`\>

The path of the written Swift file.

## 예제

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

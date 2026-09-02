[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Hàm: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## Tham số

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Trả về

`Promise`\<`string`\>

The path of the written Swift file.

## Ví dụ

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

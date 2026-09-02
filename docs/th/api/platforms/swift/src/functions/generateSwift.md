[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# ฟังก์ชัน: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## พารามิเตอร์

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## คืนค่า

`Promise`\<`string`\>

The path of the written Swift file.

## ตัวอย่าง

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

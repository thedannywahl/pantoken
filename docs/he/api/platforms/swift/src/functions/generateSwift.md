[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# פונקציה: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## פרמטרים

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## מחזיר

`Promise`\<`string`\>

The path of the written Swift file.

## דוגמה

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

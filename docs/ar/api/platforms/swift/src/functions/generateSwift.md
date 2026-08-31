[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Function: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

انبعاث Swift لموضوع مسمى (باستخدام `@pantoken/tokens` IR المُتاح بالمصدر).

## Parameters

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Returns

`Promise`\<`string`\>

مسار ملف Swift المكتوب.

## Example

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

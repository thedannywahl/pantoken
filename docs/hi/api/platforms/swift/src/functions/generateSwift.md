[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# फंक्शन: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## पैरामीटर

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## वापसी

`Promise`\<`string`\>

The path of the written Swift file.

## उदाहरण

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Fonksiyon: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametreler

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Döndürür

`Promise`\<`string`\>

The path of the written Swift file.

## Örnek

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

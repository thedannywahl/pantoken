[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Funksjon: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametere

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Returnerer

`Promise`\<`string`\>

The path of the written Swift file.

## Eksempel

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Funkcja: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametry

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Zwraca

`Promise`\<`string`\>

The path of the written Swift file.

## Przykład

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

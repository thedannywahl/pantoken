[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Função: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## Parâmetros

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Retorna

`Promise`\<`string`\>

The path of the written Swift file.

## Exemplo

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Funktion: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udled Swift til et navngivet tema (ved hjælp af det medfølgende `@pantoken/tokens` IR).

## Parametre

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Returnerer

`Promise`\<`string`\>

Stien til den skrevne Swift-fil.

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

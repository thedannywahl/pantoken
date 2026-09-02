[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Ֆունկցիա: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արտանետել Swift անվանված թեմայի համար (օգտագործելով վաճառականացված `@pantoken/tokens` IR):

## Պարամետրեր

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Վերադարձվող արժեք

`Promise`\<`string`\>

Գրված Swift ֆայլի ուղին:

## Օրինակ

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

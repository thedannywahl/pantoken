[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Function: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Արտանետել Swift անվանված թեմայի համար (օգտագործելով վաճառականացված `@pantoken/tokens` IR):

## Parameters

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Returns

`Promise`\<`string`\>

Գրված Swift ֆայլի ուղին:

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

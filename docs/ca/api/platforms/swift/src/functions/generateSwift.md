[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Function: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emetre Swift per a un tema anomenat (utilitzant el `@pantoken/tokens` IR venut).

## Parameters

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Returns

`Promise`\<`string`\>

El camí del fitxer Swift escrit.

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

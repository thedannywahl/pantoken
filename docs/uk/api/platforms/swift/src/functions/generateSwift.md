[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# Функція: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).

## Параметри

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Повертає

`Promise`\<`string`\>

The path of the written Swift file.

## Приклад

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```

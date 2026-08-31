[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / toSwift

# Function: toSwift()

> **toSwift**(`tokens`, `options`): `Promise`\<`string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emetre Swift per a un IR de token explícit.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Returns

`Promise`\<`string`\>

El camí del fitxer Swift escrit.

## Examples

**Emeteri la IR d'un tema específic**

```ts
import { toSwift } from "@pantoken/swift";
import { byTheme } from "@pantoken/tokens";

const file = await toSwift(byTheme("canvas"), { outDir: "./Sources/Tokens" });
// writes Tokens.swift (class PanTokens { … })
```

**Mode fosc amb un nom de classe personalitzat i un catàleg d'actius**

```ts
import { toSwift } from "@pantoken/swift";
import { byTheme } from "@pantoken/tokens";

await toSwift(byTheme("rebrand"), {
  outDir: "./Sources/Tokens",
  mode: "dark",
  className: "InstUITokens",
  icons: ["add", "check"], // also emits Icons.xcassets
});
```

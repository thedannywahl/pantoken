[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / toSwift

# Function: toSwift()

> **toSwift**(`tokens`, `options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Udled Swift til en eksplicit token IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Returns

`Promise`\<`string`\>

Stien til den skrevne Swift-fil.

## Examples

**Udsend et specifikt temas IR**

```ts
import { toSwift } from "@pantoken/swift";
import { byTheme } from "@pantoken/tokens";

const file = await toSwift(byTheme("canvas"), { outDir: "./Sources/Tokens" });
// writes Tokens.swift (class PanTokens { … })
```

**Mørkt tilstand med et brugerdefineret klassenavn og et aktivkatalog**

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

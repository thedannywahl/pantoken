[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / toCompose

# Function: toCompose()

> **toCompose**(`tokens`, `options`): `Promise`\<`string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet Compose Kotlin per a un token IR explícit. Retorna la ruta del fitxer escrit.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Returns

`Promise`\<`string`\>

## Examples

**Emeteri la IR d'un tema específic**

```ts
import { toCompose } from "@pantoken/compose";
import { byTheme } from "@pantoken/tokens";

const file = await toCompose(byTheme("canvas"), { outDir: "./ui/tokens" });
// writes ./ui/tokens/PanTokens.kt (object PanTokens { … })
```

**Mode fosc amb un nom d'objecte personalitzat**

```ts
import { toCompose } from "@pantoken/compose";
import { byTheme } from "@pantoken/tokens";

await toCompose(byTheme("rebrand"), {
  outDir: "./ui/tokens",
  mode: "dark",
  className: "InstUITokens", // writes InstUITokens.kt
});
```

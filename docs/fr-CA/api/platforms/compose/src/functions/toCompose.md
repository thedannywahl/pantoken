[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / toCompose

# Fonction: toCompose()

> **toCompose**(`tokens`, `options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Emit Compose Kotlin for an explicit token IR. Returns the written file path.

## Paramètres

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Retourne

`Promise`\<`string`\>

## Exemples

**Emit a specific theme's IR**

```ts
import { toCompose } from "@pantoken/compose";
import { byTheme } from "@pantoken/tokens";

const file = await toCompose(byTheme("canvas"), { outDir: "./ui/tokens" });
// writes ./ui/tokens/PanTokens.kt (object PanTokens { … })
```

**Dark mode with a custom object name**

```ts
import { toCompose } from "@pantoken/compose";
import { byTheme } from "@pantoken/tokens";

await toCompose(byTheme("rebrand"), {
  outDir: "./ui/tokens",
  mode: "dark",
  className: "InstUITokens", // writes InstUITokens.kt
});
```

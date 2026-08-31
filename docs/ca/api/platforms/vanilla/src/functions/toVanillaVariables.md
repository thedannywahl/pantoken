[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / toVanillaVariables

# Function: toVanillaVariables()

> **toVanillaVariables**(`tokens`, `options?`): `Record`\<`string`, `unknown`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Convertir una llista de tokens IR en un objecte `variables.json` de Vanilla Foundation.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### options?

[`ToVanillaOptions`](../interfaces/ToVanillaOptions.md) = `{}`

[ToVanillaOptions](../interfaces/ToVanillaOptions.md).

## Returns

`Record`\<`string`, `unknown`\>

L'objecte de variables imbricades per PUT a l'actiu `variables.json` del tema.

## Examples

**Convertir un IR a l'objecte de variables imbricades**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("rebrand"));
// { global: { mainColors: { primary: "#…" }, … }, titleBar: { … }, button: { … } }
```

**Mode fosc**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("canvas"), { mode: "dark" });
```

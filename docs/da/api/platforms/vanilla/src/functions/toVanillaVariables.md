[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / toVanillaVariables

# Function: toVanillaVariables()

> **toVanillaVariables**(`tokens`, `options?`): `Record`\<`string`, `unknown`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Konverter en IR token-liste til et Vanilla Foundation `variables.json` objekt.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### options?

[`ToVanillaOptions`](../interfaces/ToVanillaOptions.md) = `{}`

[ToVanillaOptions](../interfaces/ToVanillaOptions.md).

## Returns

`Record`\<`string`, `unknown`\>

Det indlejrede variable-objekt at PUT'e til temets `variables.json` aktiv.

## Examples

**Konverter en IR til det indlejrede variable-objekt**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("rebrand"));
// { global: { mainColors: { primary: "#…" }, … }, titleBar: { … }, button: { … } }
```

**Mørk tilstand**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("canvas"), { mode: "dark" });
```

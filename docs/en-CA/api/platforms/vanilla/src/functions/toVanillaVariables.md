[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / toVanillaVariables

# Function: toVanillaVariables()

> **toVanillaVariables**(`tokens`, `options?`): `Record`\<`string`, `unknown`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Convert an IR token list into a Vanilla Foundation `variables.json` object.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToVanillaOptions`](../interfaces/ToVanillaOptions.md) = `{}`

[ToVanillaOptions](../interfaces/ToVanillaOptions.md).

## Returns

`Record`\<`string`, `unknown`\>

The nested variables object to PUT to the theme's `variables.json` asset.

## Examples

**Convert an IR to the nested variables object**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("rebrand"));
// { global: { mainColors: { primary: "#…" }, … }, titleBar: { … }, button: { … } }
```

**Dark mode**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("canvas"), { mode: "dark" });
```

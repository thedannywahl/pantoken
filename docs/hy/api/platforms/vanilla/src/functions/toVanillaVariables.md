[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / toVanillaVariables

# Ֆունկցիա: toVanillaVariables()

> **toVanillaVariables**(`tokens`, `options?`): `Record`\<`string`, `unknown`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Վերածել IR թոկեն ցանկը Vanilla Foundation `variables.json` օբյեկտի:

## Պարամետրեր

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### options?

[`ToVanillaOptions`](../interfaces/ToVanillaOptions.md) = `{}`

[ToVanillaOptions](../interfaces/ToVanillaOptions.md).

## Վերադարձվող արժեք

`Record`\<`string`, `unknown`\>

Հետ-կառուցված փոփոխականների օբյեկտ, որը PUT տեղադրել թեմայի `variables.json` ակտիվի մեջ:

## Օրինակներ

**Վերածել IR-ը հետ-կառուցված փոփոխականների օբյեկտի**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("rebrand"));
// { global: { mainColors: { primary: "#…" }, … }, titleBar: { … }, button: { … } }
```

**Մութ ռեժիմ**

```ts
import { toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

const vars = toVanillaVariables(byTheme("canvas"), { mode: "dark" });
```

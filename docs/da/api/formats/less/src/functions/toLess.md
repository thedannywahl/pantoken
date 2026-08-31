[pantoken](../../../../index.md) / [formats/less/src](../index.md) / toLess

# Function: toLess()

> **toLess**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Udsend Less-variabler for en token IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### options?

[`ToLessOptions`](../interfaces/ToLessOptions.md) = `{}`

[ToLessOptions](../interfaces/ToLessOptions.md).

## Returns

`string`

Less-kildestrengen.

## Examples

**Udsend standardvariabler (light)**

```ts
import { toLess } from "@pantoken/less";
import { tokens } from "@pantoken/tokens";

toLess(tokens); // "@instui-color-brand: #0374b5;\n…"
```

**Løs mørk tilstand for et andet tema**

```ts
import { toLess } from "@pantoken/less";
import { byTheme } from "@pantoken/tokens";

toLess(byTheme("canvas"), { mode: "dark" });
```

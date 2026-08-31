[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / toScss

# Function: toScss()

> **toScss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emetera variables SCSS per a un token IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### options?

[`ToScssOptions`](../interfaces/ToScssOptions.md) = `{}`

[ToScssOptions](../interfaces/ToScssOptions.md).

## Returns

`string`

La cadena de font SCSS.

## Examples

**Emetre les variables per defecte (clares)**

```ts
import { toScss } from "@pantoken/scss";
import { tokens } from "@pantoken/tokens";

toScss(tokens); // "$instui-color-brand: #0374b5;\n…"
```

**Resol el mode fosc d'un altre tema**

```ts
import { toScss } from "@pantoken/scss";
import { byTheme } from "@pantoken/tokens";

toScss(byTheme("canvas"), { mode: "dark" });
```

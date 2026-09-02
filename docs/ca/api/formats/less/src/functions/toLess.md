[pantoken](../../../../index.md) / [formats/less/src](../index.md) / toLess

# Funció: toLess()

> **toLess**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emetre variables Less per a una IR de token.

## Paràmetres

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### options?

[`ToLessOptions`](../interfaces/ToLessOptions.md) = `{}`

[ToLessOptions](../interfaces/ToLessOptions.md).

## Retorna

`string`

La cadena de font Less.

## Exemples

**Emetre les variables per defecte (clares)**

```ts
import { toLess } from "@pantoken/less";
import { tokens } from "@pantoken/tokens";

toLess(tokens); // "@instui-color-brand: #0374b5;\n…"
```

**Resol el mode fosc d'un altre tema**

```ts
import { toLess } from "@pantoken/less";
import { byTheme } from "@pantoken/tokens";

toLess(byTheme("canvas"), { mode: "dark" });
```

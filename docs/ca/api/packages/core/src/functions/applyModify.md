[pantoken](../../../../index.md) / [packages/core/src](../index.md) / applyModify

# Funció: applyModify()

> **applyModify**(`value`, `modify`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Aplicar un Tokens Studio [TokenModify](../interfaces/TokenModify.md) a un color hexadecimal concret.

## Paràmetres

### value

`string`

### modify

[`TokenModify`](../interfaces/TokenModify.md)

## Retorna

`string` \| `undefined`

El color modificat, o `undefined` quan `value` no és un color hexadecimal (perquè el cridant
  pot recórrer a preservar el modificador com a metadades).

## Exemples

**Enfosquir, aclarir i afegir alfa**

```ts
import { applyModify } from "@pantoken/core";

applyModify("#808080", { type: "darken", value: 0.5 });  // → "#404040"
applyModify("#808080", { type: "lighten", value: 0.5 }); // → "#c0c0c0"
applyModify("#ffffff", { type: "alpha", value: 0.5 });   // → "#ffffff80"
```

**L'entrada no hexadecimal i la barreja retornen sense definir (preservar com a metadades)**

```ts
import { applyModify } from "@pantoken/core";

applyModify("var(--x)", { type: "darken", value: 0.1 });        // → undefined
applyModify("#fff", { type: "mix", value: 0.5, color: "#000" }); // → undefined
```

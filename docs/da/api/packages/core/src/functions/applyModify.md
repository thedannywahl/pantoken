[pantoken](../../../../index.md) / [packages/core/src](../index.md) / applyModify

# Funktion: applyModify()

> **applyModify**(`value`, `modify`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Anvend en Tokens Studio [TokenModify](../interfaces/TokenModify.md) på en konkret heksadecimal farve.

## Parametre

### value

`string`

### modify

[`TokenModify`](../interfaces/TokenModify.md)

## Returnerer

`string` \| `undefined`

Den ændrede farve, eller `undefined` når `value` ikke er en heksadecimal farve (så opkalderen
  kan falde tilbage til at bevare modifikatoren som metadata).

## Eksempler

**Mørk, lys og tilføj alpha**

```ts
import { applyModify } from "@pantoken/core";

applyModify("#808080", { type: "darken", value: 0.5 });  // → "#404040"
applyModify("#808080", { type: "lighten", value: 0.5 }); // → "#c0c0c0"
applyModify("#ffffff", { type: "alpha", value: 0.5 });   // → "#ffffff80"
```

**Ikke-hex indput og mix returner udefineret (bevare som metadata)**

```ts
import { applyModify } from "@pantoken/core";

applyModify("var(--x)", { type: "darken", value: 0.1 });        // → undefined
applyModify("#fff", { type: "mix", value: 0.5, color: "#000" }); // → undefined
```

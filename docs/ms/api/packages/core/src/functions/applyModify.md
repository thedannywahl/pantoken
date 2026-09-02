[pantoken](../../../../index.md) / [packages/core/src](../index.md) / applyModify

# Fungsi: applyModify()

> **applyModify**(`value`, `modify`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Apply a Tokens Studio [TokenModify](../interfaces/TokenModify.md) to a concrete hex colour.

## Parameter

### value

`string`

### modify

[`TokenModify`](../interfaces/TokenModify.md)

## Mengembalikan

`string` \| `undefined`

The modified colour, or `undefined` when `value` is not a hex colour (so the caller
  can fall back to preserving the modifier as metadata).

## Contoh

**Darken, lighten, and add alpha**

```ts
import { applyModify } from "@pantoken/core";

applyModify("#808080", { type: "darken", value: 0.5 });  // → "#404040"
applyModify("#808080", { type: "lighten", value: 0.5 }); // → "#c0c0c0"
applyModify("#ffffff", { type: "alpha", value: 0.5 });   // → "#ffffff80"
```

**Non-hex input and mix return undefined (preserve as metadata)**

```ts
import { applyModify } from "@pantoken/core";

applyModify("var(--x)", { type: "darken", value: 0.1 });        // → undefined
applyModify("#fff", { type: "mix", value: 0.5, color: "#000" }); // → undefined
```

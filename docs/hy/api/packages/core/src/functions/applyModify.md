[pantoken](../../../../index.md) / [packages/core/src](../index.md) / applyModify

# Function: applyModify()

> **applyModify**(`value`, `modify`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կիրառել Tokens Studio [TokenModify](../interfaces/TokenModify.md) բետոն hex գույնի վրա։

## Parameters

### value

`string`

### modify

[`TokenModify`](../interfaces/TokenModify.md)

## Returns

`string` \| `undefined`

Փոփոխված գույն, կամ `undefined` երբ `value` hex գույն չէ (այնպես որ կանչողը կարող է անցկացվել փոփոխիչը մետատվյալ պահպանել)։

## Examples

**Մուգ, լուսավոր և ավելացնել ալֆա**

```ts
import { applyModify } from "@pantoken/core";

applyModify("#808080", { type: "darken", value: 0.5 }); // → "#404040"
applyModify("#808080", { type: "lighten", value: 0.5 }); // → "#c0c0c0"
applyModify("#ffffff", { type: "alpha", value: 0.5 }); // → "#ffffff80"
```

**Non-hex input և mix վերադարձ undefined (պահպանել որպես metadata)**

```ts
import { applyModify } from "@pantoken/core";

applyModify("var(--x)", { type: "darken", value: 0.1 }); // → undefined
applyModify("#fff", { type: "mix", value: 0.5, color: "#000" }); // → undefined
```

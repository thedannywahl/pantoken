[pantoken](../../../../index.md) / [packages/core/src](../index.md) / referenceToVarName

# Function: referenceToVarName()

> **referenceToVarName**(`reference`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Map Tokens Studio reference body-ի (տեքստ `{…}`-ի ներսում) CSS custom-property անվամ, որը դա անցկացնում է: Առաջատար `semantic.` տարբերակում է semantic layer-ը primitives-ից:

## Parameters

### reference

`string`

## Returns

`string`

## Example

```ts
import { referenceToVarName } from "@pantoken/core";

referenceToVarName("color.white"); // → "--instui-primitive-color-white"
referenceToVarName("semantic.color.background.base"); // → "--instui-color-background-base"
```

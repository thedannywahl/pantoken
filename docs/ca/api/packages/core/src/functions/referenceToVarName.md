[pantoken](../../../../index.md) / [packages/core/src](../index.md) / referenceToVarName

# Function: referenceToVarName()

> **referenceToVarName**(`reference`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Mapeja un cos de referència de Tokens Studio (el text dins de `{…}`) al nom de la propietat personalitzada CSS de
el token al qual apunta. Un `semantic.` inicial discrimina la capa semàntica de les primitives.

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

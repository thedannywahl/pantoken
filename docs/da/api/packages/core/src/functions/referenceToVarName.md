[pantoken](../../../../index.md) / [packages/core/src](../index.md) / referenceToVarName

# Funktion: referenceToVarName()

> **referenceToVarName**(`reference`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Kortlæg en Tokens Studio-referencetekst (teksten inden for `{…}`) til CSS-egenskabsnavnet for
det token det peger på. En ledende `semantic.` diskriminerer det semantiske lag fra primitiver.

## Parametre

### reference

`string`

## Returnerer

`string`

## Eksempel

```ts
import { referenceToVarName } from "@pantoken/core";

referenceToVarName("color.white");                  // → "--instui-primitive-color-white"
referenceToVarName("semantic.color.background.base"); // → "--instui-color-background-base"
```

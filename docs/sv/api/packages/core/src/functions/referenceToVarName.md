[pantoken](../../../../index.md) / [packages/core/src](../index.md) / referenceToVarName

# Funktion: referenceToVarName()

> **referenceToVarName**(`reference`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Map a Tokens Studio reference body (the text inside `{…}`) to the CSS custom-property name of
the token it points at. A leading `semantic.` discriminates the semantic layer from primitives.

## Parametrar

### reference

`string`

## Returnerar

`string`

## Exempel

```ts
import { referenceToVarName } from "@pantoken/core";

referenceToVarName("color.white");                  // → "--instui-primitive-color-white"
referenceToVarName("semantic.color.background.base"); // → "--instui-color-background-base"
```

[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / elevationDeclarations

# Function: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Els parells nom/valor de `--instui-elevation-*` (cadascun una multi-capa `box-shadow`). Els valors fan referència als tokens de color de sombra desplegada dels temes, de manera que s'adapten per tema on es carrega una full de tokens.

## Returns

\[`string`, `string`\][]

Un parell de `[customProperty, value]` per nivell i àlies.

## Example

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```

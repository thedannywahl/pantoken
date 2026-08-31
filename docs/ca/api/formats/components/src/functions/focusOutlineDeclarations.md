[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineDeclarations

# Function: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Els parells nom/valor de `--instui-focus-outline-*` que llegeixen les regles de l'anell. La referència de color/amplada/desplaçament es dirigeix als tokens de focus compartits tematitzats; la transició, l'estil de línia i la inserció són constants.

## Returns

\[`string`, `string`\][]

Un parell de `[customProperty, value]` per variable de focus-ring.

## Example

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```

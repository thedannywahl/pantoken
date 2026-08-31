[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / focusOutlineDeclarations

# Function: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

De `--instui-focus-outline-*` navn/værdi-par ringereglerne læser. Farve/bredde/offset refererer til
de temaede delte fokustokens; overgangen, linjetypen og indsætning er konstanter.

## Returns

\[`string`, `string`\][]

Et `[customProperty, value]` par pr. focus-ring variabel.

## Example

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```

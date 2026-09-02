[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / focusOutlineDeclarations

# פונקציה: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

The `--instui-focus-outline-*` name/value pairs the ring rules read. Colour/width/offset reference
the themed shared focus tokens; the transition, line style, and inset are constants.

## מחזיר

\[`string`, `string`\][]

One `[customProperty, value]` pair per focus-ring variable.

## דוגמה

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```

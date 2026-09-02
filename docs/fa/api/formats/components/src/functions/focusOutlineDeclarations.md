[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineDeclarations

# تابع: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The `--instui-focus-outline-*` name/value pairs the ring rules read. Colour/width/offset reference
the themed shared focus tokens; the transition, line style, and inset are constants.

## مقدار بازگشتی

\[`string`, `string`\][]

One `[customProperty, value]` pair per focus-ring variable.

## نمونه

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```

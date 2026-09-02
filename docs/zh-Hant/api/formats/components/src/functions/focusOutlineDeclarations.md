[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineDeclarations

# 函式: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The `--instui-focus-outline-*` name/value pairs the ring rules read. Colour/width/offset reference
the themed shared focus tokens; the transition, line style, and inset are constants.

## 回傳

\[`string`, `string`\][]

One `[customProperty, value]` pair per focus-ring variable.

## 範例

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```

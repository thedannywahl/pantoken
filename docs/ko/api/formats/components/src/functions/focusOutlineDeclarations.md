[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineDeclarations

# 함수: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The `--instui-focus-outline-*` name/value pairs the ring rules read. Colour/width/offset reference
the themed shared focus tokens; the transition, line style, and inset are constants.

## 반환값

\[`string`, `string`\][]

One `[customProperty, value]` pair per focus-ring variable.

## 예제

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```

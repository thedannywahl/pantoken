[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineDeclarations

# Fonksiyon: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The `--instui-focus-outline-*` name/value pairs the ring rules read. Colour/width/offset reference
the themed shared focus tokens; the transition, line style, and inset are constants.

## Döndürür

\[`string`, `string`\][]

One `[customProperty, value]` pair per focus-ring variable.

## Örnek

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```

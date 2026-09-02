[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / focusOutlineDeclarations

# ฟังก์ชัน: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The `--instui-focus-outline-*` name/value pairs the ring rules read. Colour/width/offset reference
the themed shared focus tokens; the transition, line style, and inset are constants.

## คืนค่า

\[`string`, `string`\][]

One `[customProperty, value]` pair per focus-ring variable.

## ตัวอย่าง

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```

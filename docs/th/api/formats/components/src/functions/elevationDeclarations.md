[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationDeclarations

# ฟังก์ชัน: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The `--instui-elevation-*` name/value pairs (each a multi-layer `box-shadow`). Values reference the
themed drop-shadow colour tokens, so they adapt per theme wherever a token sheet is loaded.

## คืนค่า

\[`string`, `string`\][]

One `[customProperty, value]` pair per level and alias.

## ตัวอย่าง

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```

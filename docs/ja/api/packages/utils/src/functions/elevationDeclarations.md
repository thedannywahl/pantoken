[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / elevationDeclarations

# 関数: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The `--instui-elevation-*` name/value pairs (each a multi-layer `box-shadow`). Values reference the
themed drop-shadow colour tokens, so they adapt per theme wherever a token sheet is loaded.

## 戻り値

\[`string`, `string`\][]

One `[customProperty, value]` pair per level and alias.

## 例

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```

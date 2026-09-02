[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / unknownReferences

# 関数: unknownReferences()

> **unknownReferences**(`text`, `ir`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Drift check: `--instui-*` names in `text` that the IR doesn't define (sorted; empty means no
drift). Use for outputs that *reference* tokens defined elsewhere — e.g. the docusaurus/vitepress
bridges, whose `var(--instui-*)` targets must all be real tokens.

## パラメーター

### text

`string`

The generated output.

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

The source token IR.

## 戻り値

`string`[]

The unknown token names.

## 例

```ts
import { unknownReferences } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];

unknownReferences("--x: var(--instui-leaf); --y: var(--instui-gone);", ir);
// → ["--instui-gone"]
unknownReferences("--x: var(--instui-leaf);", ir); // → []  (no drift)
```

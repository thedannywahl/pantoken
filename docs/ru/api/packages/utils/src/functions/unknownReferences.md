[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / unknownReferences

# Функция: unknownReferences()

> **unknownReferences**(`text`, `ir`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Drift check: `--instui-*` names in `text` that the IR doesn't define (sorted; empty means no
drift). Use for outputs that *reference* tokens defined elsewhere — e.g. the docusaurus/vitepress
bridges, whose `var(--instui-*)` targets must all be real tokens.

## Параметры

### text

`string`

The generated output.

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

The source token IR.

## Возвращаемое значение

`string`[]

The unknown token names.

## Пример

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

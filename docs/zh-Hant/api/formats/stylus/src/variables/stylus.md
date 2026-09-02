[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# 變數: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

The ready-made `rebrand` Stylus variable set.

## 範例

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

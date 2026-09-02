[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# 變數: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

The ready-made `rebrand` Less variable set.

## 範例

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

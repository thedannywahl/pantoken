[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# 変数: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

The ready-made `rebrand` Less variable set.

## 例

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

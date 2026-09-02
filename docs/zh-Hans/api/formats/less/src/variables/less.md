[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# 变量: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

The ready-made `rebrand` Less variable set.

## 示例

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

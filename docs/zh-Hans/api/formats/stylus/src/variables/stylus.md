[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# 变量: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

The ready-made `rebrand` Stylus variable set.

## 示例

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

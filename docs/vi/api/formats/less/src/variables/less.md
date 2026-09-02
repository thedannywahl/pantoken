[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Biến: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

The ready-made `rebrand` Less variable set.

## Ví dụ

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# 변수: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

The ready-made `rebrand` Less variable set.

## 예제

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

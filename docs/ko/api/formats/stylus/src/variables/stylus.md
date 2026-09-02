[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# 변수: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

The ready-made `rebrand` Stylus variable set.

## 예제

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / scss

# 変数: scss

> `const` **scss**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

The ready-made `rebrand` SCSS variable set.

## 例

```ts
import { scss } from "@pantoken/scss";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.scss", scss);
```

[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / scss

# 변수: scss

> `const` **scss**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

The ready-made `rebrand` SCSS variable set.

## 예제

```ts
import { scss } from "@pantoken/scss";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.scss", scss);
```

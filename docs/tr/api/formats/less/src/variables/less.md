[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Değişken: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

The ready-made `rebrand` Less variable set.

## Örnek

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

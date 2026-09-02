[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Variabele: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

The ready-made `rebrand` Less variable set.

## Voorbeeld

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

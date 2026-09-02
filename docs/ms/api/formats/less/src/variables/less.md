[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Pembolehubah: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

The ready-made `rebrand` Less variable set.

## Contoh

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

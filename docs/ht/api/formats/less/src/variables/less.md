[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Varyab: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

The ready-made `rebrand` Less variable set.

## Egzanp

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

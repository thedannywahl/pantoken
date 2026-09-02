[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Variabel: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

The ready-made `rebrand` Less variable set.

## Døme

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

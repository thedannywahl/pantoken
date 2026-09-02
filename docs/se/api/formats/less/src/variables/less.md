[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Variable: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

The ready-made `rebrand` Less variable set.

## Exempel

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

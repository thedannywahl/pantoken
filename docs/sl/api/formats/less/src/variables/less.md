[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Spremenljivka: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

The ready-made `rebrand` Less variable set.

## Primer

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

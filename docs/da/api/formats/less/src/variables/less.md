[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Variabel: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Det færdiglavede `rebrand` Less-variabelsæt.

## Eksempel

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

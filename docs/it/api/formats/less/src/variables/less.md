[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Variabile: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

The ready-made `rebrand` Less variable set.

## Esempio

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

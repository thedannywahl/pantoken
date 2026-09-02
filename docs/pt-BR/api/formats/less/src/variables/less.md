[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Variável: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

The ready-made `rebrand` Less variable set.

## Exemplo

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

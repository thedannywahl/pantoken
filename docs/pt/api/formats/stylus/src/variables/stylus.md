[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# Variável: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

The ready-made `rebrand` Stylus variable set.

## Exemplo

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

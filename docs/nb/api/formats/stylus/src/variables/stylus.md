[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# Variabel: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

The ready-made `rebrand` Stylus variable set.

## Eksempel

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

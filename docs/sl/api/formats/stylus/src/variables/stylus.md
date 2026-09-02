[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# Spremenljivka: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

The ready-made `rebrand` Stylus variable set.

## Primer

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

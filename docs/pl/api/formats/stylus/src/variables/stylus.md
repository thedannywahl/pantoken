[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# Zmienna: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

The ready-made `rebrand` Stylus variable set.

## Przykład

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

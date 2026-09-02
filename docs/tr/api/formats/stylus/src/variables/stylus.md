[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# Değişken: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

The ready-made `rebrand` Stylus variable set.

## Örnek

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# Variable: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El conjunt de variables Stylus `rebrand` preparat.

## Example

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

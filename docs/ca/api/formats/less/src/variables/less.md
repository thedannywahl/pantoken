[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Variable: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El conjunt de variables Less `rebrand` preparat.

## Exemple

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / scss

# Variable: scss

> `const` **scss**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Det færdiglavede `rebrand` SCSS-variabelsæt.

## Example

```ts
import { scss } from "@pantoken/scss";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.scss", scss);
```

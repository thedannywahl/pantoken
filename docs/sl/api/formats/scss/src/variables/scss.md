[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / scss

# Spremenljivka: scss

> `const` **scss**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

The ready-made `rebrand` SCSS variable set.

## Primer

```ts
import { scss } from "@pantoken/scss";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.scss", scss);
```

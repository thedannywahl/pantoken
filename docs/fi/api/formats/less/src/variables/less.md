[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Muuttuja: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

The ready-made `rebrand` Less variable set.

## Esimerkki

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

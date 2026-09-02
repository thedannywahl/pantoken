[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Zmienna: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

The ready-made `rebrand` Less variable set.

## Przykład

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

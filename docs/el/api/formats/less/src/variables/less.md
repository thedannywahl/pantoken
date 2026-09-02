[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Μεταβλητή: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

The ready-made `rebrand` Less variable set.

## Παράδειγμα

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

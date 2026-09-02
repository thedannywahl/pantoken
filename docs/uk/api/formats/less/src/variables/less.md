[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Змінна: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

The ready-made `rebrand` Less variable set.

## Приклад

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# Переменная: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

The ready-made `rebrand` Less variable set.

## Пример

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```

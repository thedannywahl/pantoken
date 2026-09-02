[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / stylus

# Переменная: stylus

> `const` **stylus**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

The ready-made `rebrand` Stylus variable set.

## Пример

```ts
import { stylus } from "@pantoken/stylus";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.styl", stylus);
```

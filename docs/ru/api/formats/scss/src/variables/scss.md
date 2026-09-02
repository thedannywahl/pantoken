[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / scss

# Переменная: scss

> `const` **scss**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

The ready-made `rebrand` SCSS variable set.

## Пример

```ts
import { scss } from "@pantoken/scss";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.scss", scss);
```

[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / dtcg

# Переменная: dtcg

> `const` **dtcg**: `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The `rebrand` theme as a DTCG document (the default).

## Пример

```ts
import { dtcg } from "@pantoken/dtcg";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
```

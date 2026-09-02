[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / dtcg

# Variable: dtcg

> `const` **dtcg**: `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

The `rebrand` theme as a DTCG document (the default).

## Exempel

```ts
import { dtcg } from "@pantoken/dtcg";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
```

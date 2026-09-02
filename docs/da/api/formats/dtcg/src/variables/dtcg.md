[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / dtcg

# Variabel: dtcg

> `const` **dtcg**: `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Det `rebrand` tema som et DTCG-dokument (standard).

## Eksempel

```ts
import { dtcg } from "@pantoken/dtcg";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
```

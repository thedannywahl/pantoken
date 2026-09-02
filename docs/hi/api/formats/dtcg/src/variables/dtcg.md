[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / dtcg

# वैरिएबल: dtcg

> `const` **dtcg**: `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The `rebrand` theme as a DTCG document (the default).

## उदाहरण

```ts
import { dtcg } from "@pantoken/dtcg";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
```

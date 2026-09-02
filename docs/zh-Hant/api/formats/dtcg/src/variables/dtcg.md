[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / dtcg

# 變數: dtcg

> `const` **dtcg**: `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The `rebrand` theme as a DTCG document (the default).

## 範例

```ts
import { dtcg } from "@pantoken/dtcg";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
```

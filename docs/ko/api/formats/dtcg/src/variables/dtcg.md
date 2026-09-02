[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / dtcg

# 변수: dtcg

> `const` **dtcg**: `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The `rebrand` theme as a DTCG document (the default).

## 예제

```ts
import { dtcg } from "@pantoken/dtcg";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
```

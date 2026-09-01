[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / dtcg

# متغير: dtcg

> `const` **dtcg**: `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

السمة `rebrand` كوثيقة DTCG (الإعداد الافتراضي).

## مثال

```ts
import { dtcg } from "@pantoken/dtcg";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
```

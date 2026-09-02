[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / dtcg

# Փոփոխական: dtcg

> `const` **dtcg**: `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`rebrand` թեման որպես DTCG փורument (լռելի):

## Օրինակ

```ts
import { dtcg } from "@pantoken/dtcg";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
```

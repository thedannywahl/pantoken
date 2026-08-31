[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / dtcg

# Variable: dtcg

> `const` **dtcg**: `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`rebrand` թեման որպես DTCG փורument (լռելի):

## Example

```ts
import { dtcg } from "@pantoken/dtcg";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
```

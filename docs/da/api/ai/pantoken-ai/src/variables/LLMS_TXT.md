[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / LLMS\_TXT

# Variabel: LLMS\_TXT

> `const` **LLMS\_TXT**: `string` = `ASSETS.llms`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Indholdet af `llms.txt`.

## Eksempel

**Skriv det selv til disk**

```ts
import { writeFileSync } from "node:fs";
import { LLMS_TXT } from "@pantoken/ai";

writeFileSync("llms.txt", LLMS_TXT);
```

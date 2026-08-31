[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / LLMS\_TXT

# Variable: LLMS\_TXT

> `const` **LLMS\_TXT**: `string` = `ASSETS.llms`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

محتوى `llms.txt`.

## Example

**اكتبها على القرص بنفسك**

```ts
import { writeFileSync } from "node:fs";
import { LLMS_TXT } from "@pantoken/ai";

writeFileSync("llms.txt", LLMS_TXT);
```

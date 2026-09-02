[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / LLMS\_TXT

# 變數: LLMS\_TXT

> `const` **LLMS\_TXT**: `string` = `ASSETS.llms`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

The `llms.txt` content.

## 範例

**Write it to disk yourself**

```ts
import { writeFileSync } from "node:fs";
import { LLMS_TXT } from "@pantoken/ai";

writeFileSync("llms.txt", LLMS_TXT);
```

[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / themeJson

# ตัวแปร: themeJson

> `const` **themeJson**: [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

The ready-made `rebrand` `theme.json`.

## ตัวอย่าง

**Write it into a block theme**

```ts
import { writeFileSync } from "node:fs";
import { themeJson } from "@pantoken/wordpress";

writeFileSync("./my-theme/theme.json", JSON.stringify(themeJson, null, 2));
```

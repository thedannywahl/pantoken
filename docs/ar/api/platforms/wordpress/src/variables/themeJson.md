[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / themeJson

# متغير: themeJson

> `const` **themeJson**: [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

المُعد مسبقًا `rebrand` `theme.json`.

## مثال

**اكتبها في سمة الكتلة**

```ts
import { writeFileSync } from "node:fs";
import { themeJson } from "@pantoken/wordpress";

writeFileSync("./my-theme/theme.json", JSON.stringify(themeJson, null, 2));
```

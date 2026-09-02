[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / themeJson

# Spremenljivka: themeJson

> `const` **themeJson**: [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

The ready-made `rebrand` `theme.json`.

## Primer

**Write it into a block theme**

```ts
import { writeFileSync } from "node:fs";
import { themeJson } from "@pantoken/wordpress";

writeFileSync("./my-theme/theme.json", JSON.stringify(themeJson, null, 2));
```

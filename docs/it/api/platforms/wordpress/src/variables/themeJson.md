[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / themeJson

# Variabile: themeJson

> `const` **themeJson**: [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

The ready-made `rebrand` `theme.json`.

## Esempio

**Write it into a block theme**

```ts
import { writeFileSync } from "node:fs";
import { themeJson } from "@pantoken/wordpress";

writeFileSync("./my-theme/theme.json", JSON.stringify(themeJson, null, 2));
```

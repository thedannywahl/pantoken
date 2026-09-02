[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / themeJson

# Taipūtī: themeJson

> `const` **themeJson**: [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

The ready-made `rebrand` `theme.json`.

## Tauira

**Write it into a block theme**

```ts
import { writeFileSync } from "node:fs";
import { themeJson } from "@pantoken/wordpress";

writeFileSync("./my-theme/theme.json", JSON.stringify(themeJson, null, 2));
```

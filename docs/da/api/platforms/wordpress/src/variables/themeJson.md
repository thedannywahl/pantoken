[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / themeJson

# Variabel: themeJson

> `const` **themeJson**: [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Det færdige `rebrand` `theme.json`.

## Eksempel

**Skriv det ind i et block theme**

```ts
import { writeFileSync } from "node:fs";
import { themeJson } from "@pantoken/wordpress";

writeFileSync("./my-theme/theme.json", JSON.stringify(themeJson, null, 2));
```

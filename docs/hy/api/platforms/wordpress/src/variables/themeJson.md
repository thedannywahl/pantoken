[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / themeJson

# Variable: themeJson

> `const` **themeJson**: [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Պատրաստ `rebrand` `theme.json`:

## Example

**Գրեք այն block-theme-ի մեջ**

```ts
import { writeFileSync } from "node:fs";
import { themeJson } from "@pantoken/wordpress";

writeFileSync("./my-theme/theme.json", JSON.stringify(themeJson, null, 2));
```

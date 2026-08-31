[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / themeJson

# Variable: themeJson

> `const` **themeJson**: [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`rebrand` `theme.json` الجاهز.

## Example

**اكتبه في مظهر كتل**

```ts
import { writeFileSync } from "node:fs";
import { themeJson } from "@pantoken/wordpress";

writeFileSync("./my-theme/theme.json", JSON.stringify(themeJson, null, 2));
```

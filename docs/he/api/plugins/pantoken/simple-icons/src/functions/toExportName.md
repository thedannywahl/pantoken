[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# פונקציה: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).

## פרמטרים

### slug

`string`

## מחזיר

`string`

## דוגמה

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# تابع: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).

## پارامترها

### slug

`string`

## مقدار بازگشتی

`string`

## نمونه

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

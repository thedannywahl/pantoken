[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# Function: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تحويل عنوان سهل الاستخدام (`"github-actions"`) إلى اسم تصديره Simple Icons (`"siGithubActions"`).

## Parameters

### slug

`string`

## Returns

`string`

## Example

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

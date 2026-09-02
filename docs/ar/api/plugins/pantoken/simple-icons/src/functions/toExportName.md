[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# دالة: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

حوّل الـslug (`"github-actions"`) إلى اسم التصدير الخاص بـ Simple Icons (`"siGithubActions"`).

## المعلمات

### slug

`string`

## القيم المرجعة

`string`

## مثال

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# 函式: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).

## 參數

### slug

`string`

## 回傳

`string`

## 範例

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

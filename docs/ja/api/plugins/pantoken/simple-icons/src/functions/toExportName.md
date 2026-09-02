[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# 関数: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).

## パラメーター

### slug

`string`

## 戻り値

`string`

## 例

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

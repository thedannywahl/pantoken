[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# 함수: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).

## 매개변수

### slug

`string`

## 반환값

`string`

## 예제

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

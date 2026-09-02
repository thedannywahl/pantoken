[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# ฟังก์ชัน: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).

## พารามิเตอร์

### slug

`string`

## คืนค่า

`string`

## ตัวอย่าง

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

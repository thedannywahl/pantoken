[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# फंक्शन: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).

## पैरामीटर

### slug

`string`

## वापसी

`string`

## उदाहरण

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

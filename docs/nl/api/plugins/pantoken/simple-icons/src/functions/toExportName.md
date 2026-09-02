[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# Functie: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).

## Parameters

### slug

`string`

## Retourneert

`string`

## Voorbeeld

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

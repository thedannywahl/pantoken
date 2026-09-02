[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# Función: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).

## Parámetros

### slug

`string`

## Devuelve

`string`

## Ejemplo

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

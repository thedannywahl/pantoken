[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# Funktion: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Konverter en slug (`"github-actions"`) til dens Simple Icons eksportnavn (`"siGithubActions"`).

## Parametre

### slug

`string`

## Returnerer

`string`

## Eksempel

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

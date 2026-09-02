[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / toExportName

# Ֆունկցիա: toExportName()

> **toExportName**(`slug`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Փոխակերպել սլագ (`"github-actions"`) դրա Simple Icons արտահանման անվանմամբ (`"siGithubActions"`):

## Պարամետրեր

### slug

`string`

## Վերադարձվող արժեք

`string`

## Օրինակ

```ts
import { toExportName } from "@pantoken/plugin-simple-icons";

toExportName("github"); // "siGithub"
toExportName("github-actions"); // "siGithubActions"
```

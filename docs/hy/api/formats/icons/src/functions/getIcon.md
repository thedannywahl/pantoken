[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Ֆունկցիա: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Փնտրել պատկերակ անվանմամբ:

## Պարամետրեր

### name

`string`

## Վերադարձվող արժեք

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Օրինակ

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```

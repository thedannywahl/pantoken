[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# फंक्शन: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Look up an icon by name.

## पैरामीटर

### name

`string`

## वापसी

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## उदाहरण

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```

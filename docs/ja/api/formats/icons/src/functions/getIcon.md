[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# 関数: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Look up an icon by name.

## パラメーター

### name

`string`

## 戻り値

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## 例

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```

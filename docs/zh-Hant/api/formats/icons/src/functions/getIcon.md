[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# 函式: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Look up an icon by name.

## 參數

### name

`string`

## 回傳

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## 範例

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```

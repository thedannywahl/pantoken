[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# 函数: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up an icon by name.

## 参数

### name

`string`

## 返回值

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## 示例

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```

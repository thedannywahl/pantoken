[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# 함수: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Look up an icon by name.

## 매개변수

### name

`string`

## 반환값

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## 예제

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```

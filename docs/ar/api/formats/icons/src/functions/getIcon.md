[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# دالة: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ابحث عن أيقونة حسب الاسم.

## المعلمات

### name

`string`

## القيم المرجعة

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## مثال

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```

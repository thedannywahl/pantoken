[pantoken](../../../../index.md) / [formats/components/src](../index.md) / selectCss

# Function: selectCss()

> **selectCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تحسين **تجريبي** قابل للتخصيص للـ `.&lt;prefix&gt;-simple-select`. كل شيء محمي خلف `@supports (appearance: base-select)` (نموذج CSS Customizable Select — Chrome 135+،
ليس بعد Baseline)، لذا فهو تحسين تدريجي بحت: المتصفحات التي لا تدعم تحتفظ بعنصر تحكم `simpleSelectCss` عادي؛ المتصفحات الداعمة تحصل على لوحة `::picker(select)` مصممة و`option`s مصممة (hover/selected) من رموز `--instui-component-options-item-*`. تم شحنها كـ `select.css` اختيارية خاصة بها (مثل `fonts.css`) بدلاً من طيها في `components.css`، بالضبط لأن الميزة تجريبية — تختار بشكل متعمد.

```demo
self:simple-select
```

## Parameters

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## Returns

`string`

سلسلة CSS.

## Example

```ts
import { selectCss } from "@pantoken/components";

// Load AFTER components.css; enhances the same <select class="instui-simple-select"> element.
const css = selectCss();
```

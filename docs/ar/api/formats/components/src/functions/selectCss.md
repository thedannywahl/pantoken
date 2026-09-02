[pantoken](../../../../index.md) / [formats/components/src](../index.md) / selectCss

# دالة: selectCss()

> **selectCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

التحسين القابل للتخصيص لاختيار **تجريبي** لـ `.&lt;prefix&gt;-simple-select`. كل شيء محجوب خلف `@supports (appearance: base-select)` (نموذج CSS Customizable Select — Chrome 135+، لم يصل بعد إلى Baseline)، لذا هو تحسين تقدمي نقي: المتصفحات التي لا تدعم تحتفظ بعنصر التحكم البسيط `simpleSelectCss`; المتصفحات الداعمة تحصل على لوحة `::picker(select)` ذات تنسيق وعناصر `option`s ذات تنسيق (عند التحويم/المحدد) من رموز `--instui-component-options-item-*`. يُوزع كـ `select.css` اختياري (مثل `fonts.css`) بدلًا من دمجه في `components.css`، وذلك لأن الميزة تجريبية — الاشتراك فيها يتم عن قصد.

```demo
self:simple-select
```

## المعلمات

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## القيم المرجعة

`string`

سلسلة CSS.

## مثال

```ts
import { selectCss } from "@pantoken/components";

// Load AFTER components.css; enhances the same <select class="instui-simple-select"> element.
const css = selectCss();
```

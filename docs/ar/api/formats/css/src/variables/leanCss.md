[pantoken](../../../../index.md) / [formats/css/src](../index.md) / leanCss

# Variable: leanCss

> `const` **leanCss**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

سلسلة ورقة النمط النحيلة `rebrand` — الورقة الكاملة ناقص رموز الحروف الرسومية `--instui-icon-*` (بيانات الرموز URIs ~1,777 التي تشكل معظم [css](css.md)). تقريبًا سادس الحجم عبر السلك؛ الأساس الموصى به لتسليم CDN/embed. تشير المكونات فقط إلى حفنة من الرموز، المرسلة بشكل منفصل كـ `component-icons.css` من `@pantoken/components`؛ المستهلكون الذين يستخدمون `var(--instui-icon-*)` على نطاق واسع يجب أن يحملوا [css](css.md) الكاملة (أو ورقة الحروف الرسومية `icons.css`). انظر `@pantoken/css/style.lean.css`.

## Example

```ts
import { leanCss } from "@pantoken/css";
```

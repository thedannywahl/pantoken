[pantoken](../../../../index.md) / [formats/css/src](../index.md) / leanCss

# متغير: leanCss

> `const` **leanCss**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

سلسلة ورقة الأنماط الخفيفة `rebrand` — الورقة الكاملة بدون توكنات الرموز `--instui-icon-*` (حوالي
~1,777 من بيانات URI للرموز التي تشكل معظم [css](css.md)). تقارب سدس الحجم عند النقل؛ الأساس الموصى به لتسليم عبر CDN/التضمين. تشير المكونات إلى عدد قليل فقط من الأيقونات، المشحونة بشكل منفصل كـ `@pantoken/components`'s `component-icons.css`; المستهلكون الذين يستخدمون `var(--instui-icon-*)` على نطاق واسع يجب أن يحملوا الـ [css](css.md) الكامل (أو ورقة الرموز `icons.css`). انظر
`@pantoken/css/style.lean.css`.

## مثال

```ts
import { leanCss } from "@pantoken/css";
```

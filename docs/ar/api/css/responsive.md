# CSS: responsive

`[class*="-hidden-"],[class*="-show-"]` — فئات إظهار/إخفاء تعتمد على عرض نافذة العرض أو عرض الحاوية عبر مقياس نقاط توقف ذو سمة.

`.instui-hidden-max-&lt;bp&gt;`/`-hidden-min-&lt;bp&gt;` تخفي بحسب عرض نافذة العرض؛ `.instui-show-max-&lt;bp&gt;`/`-show-min-&lt;bp&gt;` هي العكس (مخفية افتراضيًا، تُعرض فقط داخل النطاق عبر `display: revert`); المتغيرات `-cq-` تستجيب بدلًا لذلك لعرض السلف `.instui-container` وليس لعرض نافذة العرض. مستويات المقياس `xs`/`sm`/`md`/`lg`/`xl` (مأخوذة من توكنات مكوّن tray-width في IR) مرادفة لكل منها لتهجئة طويلة (`x-small`–`x-large`) واسم جهاز (`mobile`/`phablet`/`tablet`/`laptop`/`desktop`) — وكلاهما مهجوران لصالح الاسم القصير — بالإضافة إلى المستويات ذات السمة غير المقاسة `content`/`content-full-width` (الحد الأقصى لعرض منطقة المحتوى الرئيسية).

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/responsive/index.ts)

## الاستخدام

```css
@import "@pantoken/components/utilities.css";
```

## أمثلة

```html
<div class="instui-hidden-max-sm">Hidden at or below the small breakpoint.</div>
<div class="instui-show-min-sm">Shown only at or above the small breakpoint.</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-cq-hidden-max-content` | يُخفى عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `content` (`68.75em`). |
| `.-cq-hidden-max-content-full-width` | يُخفى عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `content-full-width` (__PTK_INLINE_CODE_1%). |
| `.-cq-hidden-max-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`. |
| `.-cq-hidden-max-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`. |
| `.-cq-hidden-max-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`. |
| `.-cq-hidden-max-lg` | يُخفى عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `lg` (`48em`). |
| `.-cq-hidden-max-md` | يُخفى عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `md` (`30em`). |
| `.-cq-hidden-max-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`. |
| `.-cq-hidden-max-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`. |
| `.-cq-hidden-max-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`. |
| `.-cq-hidden-max-sm` | يُخفى عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `sm` (`20em`). |
| `.-cq-hidden-max-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`. |
| `.-cq-hidden-max-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`. |
| `.-cq-hidden-max-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`. |
| `.-cq-hidden-max-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`. |
| `.-cq-hidden-max-xl` | يُخفى عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `xl` (__PTK_INLINE_CODE_1%). |
| `.-cq-hidden-max-xs` | يُخفى عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `xs` (`16em`). |
| `.-cq-hidden-min-content` | يُخفى عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `content` (`68.75em`). |
| `.-cq-hidden-min-content-full-width` | يُخفى عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `content-full-width` (`98.75em`). |
| `.-cq-hidden-min-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`. |
| `.-cq-hidden-min-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`. |
| `.-cq-hidden-min-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`. |
| `.-cq-hidden-min-lg` | يُخفى عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `lg` (`48em`). |
| `.-cq-hidden-min-md` | يُخفى عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `md` (`30em`). |
| `.-cq-hidden-min-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`. |
| `.-cq-hidden-min-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`. |
| `.-cq-hidden-min-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`. |
| `.-cq-hidden-min-sm` | يُخفى عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `sm` (__PTK_INLINE_CODE_1%). |
| `.-cq-hidden-min-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`. |
| `.-cq-hidden-min-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`. |
| `.-cq-hidden-min-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`. |
| `.-cq-hidden-min-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`. |
| `.-cq-hidden-min-xl` | يُخفى عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `xl` (__PTK_INLINE_CODE_1%). |
| `.-cq-hidden-min-xs` | يُخفى عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `xs` (__PTK_INLINE_CODE_1%). |
| `.-cq-show-max-content` | يُعرض عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `content` (`68.75em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-max-content-full-width` | يُعرض عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `content-full-width` (`98.75em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-max-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`. |
| `.-cq-show-max-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`. |
| `.-cq-show-max-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`. |
| `.-cq-show-max-lg` | يُعرض عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `lg` (`48em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-max-md` | يُعرض عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `md` (`30em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-max-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`. |
| `.-cq-show-max-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`. |
| `.-cq-show-max-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`. |
| `.-cq-show-max-sm` | يُعرض عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `sm` (`20em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-max-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`. |
| `.-cq-show-max-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`. |
| `.-cq-show-max-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`. |
| `.-cq-show-max-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`. |
| `.-cq-show-max-xl` | يُعرض عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `xl` (`62em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-max-xs` | يُعرض عندما يكون الحاوي المعلم عند أو أقل من نقطة التوقف `xs` (`16em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-min-content` | يُعرض عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `content` (`68.75em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-min-content-full-width` | يُعرض عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `content-full-width` (`98.75em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-min-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`. |
| `.-cq-show-min-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`. |
| `.-cq-show-min-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`. |
| `.-cq-show-min-lg` | يُعرض عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `lg` (`48em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-min-md` | يُعرض عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `md` (`30em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-min-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`. |
| `.-cq-show-min-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`. |
| `.-cq-show-min-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`. |
| `.-cq-show-min-sm` | يُعرض عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `sm` (`20em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-min-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`. |
| `.-cq-show-min-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`. |
| `.-cq-show-min-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`. |
| `.-cq-show-min-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`. |
| `.-cq-show-min-xl` | يُعرض عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `xl` (`62em`)؛ ومخفى خلاف ذلك. |
| `.-cq-show-min-xs` | يُعرض عندما يكون الحاوي المعلم عند أو أعلى من نقطة التوقف `xs` (`16em`)؛ ومخفى خلاف ذلك. |
| `.-hidden-max-content` | يُخفى عندما تكون نافذة العرض عند أو أقل من نقطة التوقف `content` (`68.75em`). |
| `.-hidden-max-content-full-width` | يُخفى عندما تكون نافذة العرض عند أو أقل من نقطة التوقف `content-full-width` (__PTK_INLINE_CODE_1%). |
| `.-hidden-max-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`. |
| `.-hidden-max-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`. |
| `.-hidden-max-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`. |
| `.-hidden-max-lg` | يُخفى عندما تكون نافذة العرض عند أو أقل من نقطة التوقف `lg` (__PTK_INLINE_CODE_1%). |
| `.-hidden-max-md` | يُخفى عندما تكون نافذة العرض عند أو أقل من نقطة التوقف `md` (__PTK_INLINE_CODE_1%). |
| `.-hidden-max-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`. |
| `.-hidden-max-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`. |
| `.-hidden-max-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`. |
| `.-hidden-max-sm` | يُخفى عندما تكون نافذة العرض عند أو أقل من نقطة التوقف `sm` (__PTK_INLINE_CODE_1%). |
| `.-hidden-max-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`. |
| `.-hidden-max-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`. |
| `.-hidden-max-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`. |
| `.-hidden-max-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`. |
| `.-hidden-max-xl` | يُخفى عندما تكون نافذة العرض عند أو أقل من نقطة التوقف `xl` (__PTK_INLINE_CODE_1%). |
| `.-hidden-max-xs` | يُخفى عندما تكون نافذة العرض عند أو أقل من نقطة التوقف `xs` (__PTK_INLINE_CODE_1%). |
| `.-hidden-min-content` | يُخفى عندما تكون نافذة العرض عند أو أعلى من نقطة التوقف `content` (__PTK_INLINE_CODE_1%). |
| `.-hidden-min-content-full-width` | إخفاء عندما تكون مساحة العرض عند أو فوق نقطة التوقف `content-full-width` (`98.75em`). |
| `.-hidden-min-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`. |
| `.-hidden-min-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`. |
| `.-hidden-min-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`. |
| `.-hidden-min-lg` | إخفاء عندما تكون مساحة العرض عند أو فوق نقطة التوقف `lg` (`48em`). |
| `.-hidden-min-md` | إخفاء عندما تكون مساحة العرض عند أو فوق نقطة التوقف `md` (`30em`). |
| `.-hidden-min-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`. |
| `.-hidden-min-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`. |
| `.-hidden-min-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`. |
| `.-hidden-min-sm` | إخفاء عندما تكون مساحة العرض عند أو فوق نقطة التوقف `sm` (`20em`). |
| `.-hidden-min-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`. |
| `.-hidden-min-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`. |
| `.-hidden-min-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`. |
| `.-hidden-min-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`. |
| `.-hidden-min-xl` | إخفاء عندما تكون مساحة العرض عند أو فوق نقطة التوقف `xl` (`62em`). |
| `.-hidden-min-xs` | إخفاء عندما تكون مساحة العرض عند أو فوق نقطة التوقف `xs` (`16em`). |
| `.-show-max-content` | عرض (العكس لـ `-hidden-min-content`) عندما تكون مساحة العرض عند أو أسفل نقطة التوقف `content` (`68.75em`); مخفي بخلاف ذلك. |
| `.-show-max-content-full-width` | عرض (العكس لـ `-hidden-min-content-full-width`) عندما تكون مساحة العرض عند أو أسفل نقطة التوقف `content-full-width` (`98.75em`); مخفي بخلاف ذلك. |
| `.-show-max-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`. |
| `.-show-max-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`. |
| `.-show-max-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`. |
| `.-show-max-lg` | عرض (العكس لـ `-hidden-min-lg`) عندما تكون مساحة العرض عند أو أسفل نقطة التوقف `lg` (`48em`); مخفي بخلاف ذلك. |
| `.-show-max-md` | عرض (العكس لـ `-hidden-min-md`) عندما تكون مساحة العرض عند أو أسفل نقطة التوقف `md` (`30em`); مخفي بخلاف ذلك. |
| `.-show-max-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`. |
| `.-show-max-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`. |
| `.-show-max-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`. |
| `.-show-max-sm` | عرض (العكس لـ `-hidden-min-sm`) عندما تكون مساحة العرض عند أو أسفل نقطة التوقف `sm` (`20em`); مخفي بخلاف ذلك. |
| `.-show-max-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`. |
| `.-show-max-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`. |
| `.-show-max-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`. |
| `.-show-max-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`. |
| `.-show-max-xl` | عرض (العكس لـ `-hidden-min-xl`) عندما تكون مساحة العرض عند أو أسفل نقطة التوقف `xl` (`62em`); مخفي بخلاف ذلك. |
| `.-show-max-xs` | عرض (العكس لـ `-hidden-min-xs`) عندما تكون مساحة العرض عند أو أسفل نقطة التوقف `xs` (`16em`); مخفي بخلاف ذلك. |
| `.-show-min-content` | عرض (العكس لـ `-hidden-max-content`) عندما تكون مساحة العرض عند أو فوق نقطة التوقف `content` (`68.75em`); مخفي بخلاف ذلك. |
| `.-show-min-content-full-width` | عرض (العكس لـ `-hidden-max-content-full-width`) عندما تكون مساحة العرض عند أو فوق نقطة التوقف `content-full-width` (`98.75em`); مخفي بخلاف ذلك. |
| `.-show-min-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`. |
| `.-show-min-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`. |
| `.-show-min-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`. |
| `.-show-min-lg` | عرض (العكس لـ `-hidden-max-lg`) عندما تكون مساحة العرض عند أو فوق نقطة التوقف `lg` (`48em`); مخفي بخلاف ذلك. |
| `.-show-min-md` | عرض (العكس لـ `-hidden-max-md`) عندما تكون مساحة العرض عند أو فوق نقطة التوقف `md` (`30em`); مخفي بخلاف ذلك. |
| `.-show-min-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`. |
| `.-show-min-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`. |
| `.-show-min-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`. |
| `.-show-min-sm` | عرض (العكس لـ `-hidden-max-sm`) عندما تكون مساحة العرض عند أو فوق نقطة التوقف `sm` (`20em`); مخفي بخلاف ذلك. |
| `.-show-min-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`. |
| `.-show-min-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`. |
| `.-show-min-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`. |
| `.-show-min-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`. |
| `.-show-min-xl` | عرض (العكس لـ `-hidden-max-xl`) عندما تكون مساحة العرض عند أو فوق نقطة التوقف `xl` (`62em`); مخفي بخلاف ذلك. |
| `.-show-min-xs` | عرض (العكس لـ `-hidden-max-xs`) عندما تكون مساحة العرض عند أو فوق نقطة التوقف `xs` (`16em`); مخفي بخلاف ذلك. |

## خصائص مخصّصة

| خاصية | نوع | افتراضي | الوصف |
| --- | --- | --- | --- |
| `--pantoken-bp-content` | `<length>` | `68.75em` | قيمة نقطة التوقف `content` (`68.75em`، مكتوبة يدوياً، ذات سمة (ليست في نموذج الرموز)). تجاوزها لا ينقل العتبات المجمعة `@media`/`@container` إلى أعلى. |
| `--pantoken-bp-content-full-width` | `<length>` | `98.75em` | قيمة نقطة التوقف `content-full-width` (`98.75em`، مكتوبة يدوياً، ذات سمة (ليست في نموذج الرموز)). تجاوزها لا ينقل العتبات المجمعة `@media`/`@container` إلى أعلى. |
| `--pantoken-bp-lg` | `<length>` | `48em` | قيمة نقطة التوقف `lg` (`48em`، تعكس `--instui-component-tray-width-lg`). تجاوزها لا ينقل العتبات المجمعة `@media`/`@container` إلى أعلى. |
| `--pantoken-bp-md` | `<length>` | `30em` | قيمة نقطة التوقف `md` (`30em`، تعكس `--instui-component-tray-width-md`). تجاوزها لا ينقل العتبات المجمعة `@media`/`@container` إلى أعلى. |
| `--pantoken-bp-sm` | `<length>` | `20em` | قيمة نقطة التوقف `sm` (`20em`، تعكس `--instui-component-tray-width-sm`). تجاوزها لا ينقل العتبات المجمعة `@media`/`@container` إلى أعلى. |
| `--pantoken-bp-xl` | `<length>` | `62em` | قيمة نقطة التوقف `xl` (`62em`، تعكس `--instui-component-tray-width-xl`). تجاوزها لا ينقل العتبات المجمعة `@media`/`@container` إلى أعلى. |
| `--pantoken-bp-xs` | `<length>` | `16em` | قيمة نقطة التوقف `xs` (`16em`، تعكس `--instui-component-tray-width-xs`). تجاوزها لا ينقل العتبات المجمعة `@media`/`@container` إلى أعلى. |

## الشروط

| نوع | استعلام | الوصف |
| --- | --- | --- |
| media | `(max-width: 16em)` | الحد الأعلى لنقطة التوقف `xs`. |
| media | `(min-width: 16em)` | الحد الأدنى لنقطة التوقف `xs`. |
| media | `(max-width: 20em)` | الحد الأعلى لنقطة التوقف `sm`. |
| media | `(min-width: 20em)` | الحد الأدنى لنقطة التوقف `sm`. |
| media | `(max-width: 30em)` | الحد الأعلى لنقطة التوقف `md`. |
| media | `(min-width: 30em)` | الحد الأدنى لنقطة التوقف `md`. |
| media | `(max-width: 48em)` | الحد الأعلى لنقطة التوقف `lg`. |
| media | `(min-width: 48em)` | الحد الأدنى لنقطة التوقف `lg`. |
| media | `(max-width: 62em)` | الحد الأعلى لنقطة التوقف `xl`. |
| media | `(min-width: 62em)` | الحد الأدنى لنقطة التوقف `xl`. |
| media | `(max-width: 68.75em)` | الحد الأعلى لنقطة التوقف `content`. |
| media | `(min-width: 68.75em)` | الحد الأدنى لنقطة التوقف `content`. |
| media | `(max-width: 98.75em)` | الحد الأعلى لنقطة التوقف `content-full-width`. |
| media | `(min-width: 98.75em)` | الحد الأدنى لنقطة التوقف `content-full-width`. |
| container | `(max-width: 16em)` | الحد الأعلى لنقطة التوقف `xs`، مقيّم مقابل حاوية محددة. |
| container | `(min-width: 16em)` | الحد الأدنى لنقطة التوقف `xs`، مقيّم مقابل حاوية محددة. |
| container | `(max-width: 20em)` | الحد الأعلى لنقطة التوقف `sm`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(min-width: 20em)` | الحد الأدنى لنقطة التوقف `sm`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(max-width: 30em)` | الحد الأعلى لنقطة التوقف `md`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(min-width: 30em)` | الحد الأدنى لنقطة التوقف `md`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(max-width: 48em)` | الحد الأعلى لنقطة التوقف `lg`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(min-width: 48em)` | الحد الأدنى لنقطة التوقف `lg`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(max-width: 62em)` | الحد الأعلى لنقطة التوقف `xl`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(min-width: 62em)` | الحد الأدنى لنقطة التوقف `xl`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(max-width: 68.75em)` | الحد الأعلى لنقطة التوقف `content`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(min-width: 68.75em)` | الحد الأدنى لنقطة التوقف `content`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(max-width: 98.75em)` | الحد الأعلى لنقطة التوقف `content-full-width`، مقيمة مقابل حاوية مُعلَّمة. |
| container | `(min-width: 98.75em)` | الحد الأدنى لنقطة التوقف `content-full-width`، مقيمة مقابل حاوية مُعلَّمة. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-tray-width-lg` | `<length>` | `48em` |
| `--instui-component-tray-width-md` | `<length>` | `30em` |
| `--instui-component-tray-width-sm` | `<length>` | `20em` |
| `--instui-component-tray-width-xl` | `<length>` | `62em` |
| `--instui-component-tray-width-xs` | `<length>` | `16em` |


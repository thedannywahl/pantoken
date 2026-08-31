# CSS: responsive

`[class*="-hidden-"],[class*="-show-"]` — فئات عرض/إخفاء عرض الإطار أو عرض الحاوية عبر مقياس نقطة توقف بنمط.

`.instui-hidden-max-&lt;bp&gt;`/`-hidden-min-&lt;bp&gt;` إخفاء حسب عرض الإطار؛ `.instui-show-max-&lt;bp&gt;`/`-show-min-&lt;bp&gt;` هي العكس (مخفي بشكل افتراضي، معروض فقط داخل النطاق عبر `display: revert`); متغيرات `-cq-` تتفاعل مع عرض سلف `.instui-container` بدلاً من ذلك، وليس عرض الإطار. مستويات المقياس `xs`/`sm`/`md`/`lg`/`xl` (المصدر من رموز مكون عرض الصينية في الأشعة تحت الحمراء) كل منها مستعار لإملاء النموذج الطويل (`x-small`–`x-large`) واسم الجهاز (`mobile`/`phablet`/`tablet`/`laptop`/`desktop`) — كلاهما مهجور لصالح الاسم القصير — بالإضافة إلى مستويات `content`/`content-full-width` غير المتدرجة والمنسقة (أقصى عرض لمنطقة المحتوى الرئيسية).

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/responsive/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="instui-hidden-max-sm">Hidden at or below the small breakpoint.</div>
<div class="instui-show-min-sm">Shown only at or above the small breakpoint.</div>
```

## Modifiers

| Modifier                             | Description                                                                                                                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `.-cq-hidden-max-content`            | إخفاء عند وجود الحاوية المحددة في أو تحت نقطة التوقف `content` (`68.75em`).                                                              |
| `.-cq-hidden-max-content-full-width` | إخفاء عند وجود الحاوية المحددة في أو تحت نقطة التوقف `content-full-width` (`98.75em`).                                                   |
| `.-cq-hidden-max-desktop`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`.                                      |
| `.-cq-hidden-max-laptop`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`.                                      |
| `.-cq-hidden-max-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`.                                      |
| `.-cq-hidden-max-lg`                 | إخفاء عند وجود الحاوية المحددة في أو تحت نقطة التوقف `lg` (`48em`).                                                                      |
| `.-cq-hidden-max-md`                 | إخفاء عند وجود الحاوية المحددة في أو تحت نقطة التوقف `md` (`30em`).                                                                      |
| `.-cq-hidden-max-medium`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`.                                      |
| `.-cq-hidden-max-mobile`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`.                                      |
| `.-cq-hidden-max-phablet`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`.                                      |
| `.-cq-hidden-max-sm`                 | إخفاء عند وجود الحاوية المحددة في أو تحت نقطة التوقف `sm` (`20em`).                                                                      |
| `.-cq-hidden-max-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`.                                      |
| `.-cq-hidden-max-tablet`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`.                                      |
| `.-cq-hidden-max-x-large`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`.                                      |
| `.-cq-hidden-max-x-small`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`.                                      |
| `.-cq-hidden-max-xl`                 | إخفاء عند وجود الحاوية المحددة في أو تحت نقطة التوقف `xl` (`62em`).                                                                      |
| `.-cq-hidden-max-xs`                 | إخفاء عند وجود الحاوية المحددة في أو تحت نقطة التوقف `xs` (`16em`).                                                                      |
| `.-cq-hidden-min-content`            | إخفاء عند وجود الحاوية المحددة في أو فوق نقطة التوقف `content` (`68.75em`).                                                              |
| `.-cq-hidden-min-content-full-width` | إخفاء عندما تكون الحاوية المحددة عند حد `content-full-width` أو فوقه (`98.75em`).                                                        |
| `.-cq-hidden-min-desktop`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`.                                      |
| `.-cq-hidden-min-laptop`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`.                                      |
| `.-cq-hidden-min-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`.                                      |
| `.-cq-hidden-min-lg`                 | إخفاء عندما تكون الحاوية المحددة عند حد `lg` أو فوقه (`48em`).                                                                           |
| `.-cq-hidden-min-md`                 | إخفاء عندما تكون الحاوية المحددة عند حد `md` أو فوقه (`30em`).                                                                           |
| `.-cq-hidden-min-medium`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`.                                      |
| `.-cq-hidden-min-mobile`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`.                                      |
| `.-cq-hidden-min-phablet`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`.                                      |
| `.-cq-hidden-min-sm`                 | إخفاء عندما تكون الحاوية المحددة عند حد `sm` أو فوقه (`20em`).                                                                           |
| `.-cq-hidden-min-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`.                                      |
| `.-cq-hidden-min-tablet`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`.                                      |
| `.-cq-hidden-min-x-large`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`.                                      |
| `.-cq-hidden-min-x-small`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`.                                      |
| `.-cq-hidden-min-xl`                 | إخفاء عندما تكون الحاوية المحددة عند حد `xl` أو فوقه (`62em`).                                                                           |
| `.-cq-hidden-min-xs`                 | إخفاء عندما تكون الحاوية المحددة عند حد `xs` أو فوقه (`16em`).                                                                           |
| `.-cq-show-max-content`              | عرض عندما تكون الحاوية المحددة عند حد `content` أو تحته (`68.75em`); مخفيًا خلاف ذلك.                                                    |
| `.-cq-show-max-content-full-width`   | عرض عندما تكون الحاوية المحددة عند حد `content-full-width` أو تحته (`98.75em`); مخفيًا خلاف ذلك.                                         |
| `.-cq-show-max-desktop`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`.                                        |
| `.-cq-show-max-laptop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`.                                        |
| `.-cq-show-max-large`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`.                                        |
| `.-cq-show-max-lg`                   | عرض عندما تكون الحاوية المحددة عند حد `lg` أو تحته (`48em`); مخفيًا خلاف ذلك.                                                            |
| `.-cq-show-max-md`                   | عرض عندما تكون الحاوية المحددة عند حد `md` أو تحته (`30em`); مخفيًا خلاف ذلك.                                                            |
| `.-cq-show-max-medium`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`.                                        |
| `.-cq-show-max-mobile`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`.                                        |
| `.-cq-show-max-phablet`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`.                                        |
| `.-cq-show-max-sm`                   | عرض عندما تكون الحاوية المحددة عند حد `sm` أو تحته (`20em`); مخفيًا خلاف ذلك.                                                            |
| `.-cq-show-max-small`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`.                                        |
| `.-cq-show-max-tablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`.                                        |
| `.-cq-show-max-x-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`.                                        |
| `.-cq-show-max-x-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`.                                        |
| `.-cq-show-max-xl`                   | عرض عندما تكون الحاوية المحددة عند حد `xl` أو تحته (`62em`); مخفيًا خلاف ذلك.                                                            |
| `.-cq-show-max-xs`                   | عرض عندما تكون الحاوية المحددة عند حد `xs` أو تحته (`16em`); مخفيًا خلاف ذلك.                                                            |
| `.-cq-show-min-content`              | عرض عندما تكون الحاوية المحددة عند حد `content` أو فوقه (`68.75em`); مخفيًا خلاف ذلك.                                                    |
| `.-cq-show-min-content-full-width`   | عرض عندما تكون الحاوية المحددة عند حد `content-full-width` أو فوقه (`98.75em`); مخفيًا خلاف ذلك.                                         |
| `.-cq-show-min-desktop`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`.                                        |
| `.-cq-show-min-laptop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`.                                        |
| `.-cq-show-min-large`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`.                                        |
| `.-cq-show-min-lg`                   | عرض عندما تكون الحاوية المحددة عند حد `lg` أو فوقه (`48em`); مخفيًا خلاف ذلك.                                                            |
| `.-cq-show-min-md`                   | عرض عندما تكون الحاوية المحددة عند حد `md` أو فوقه (`30em`); مخفيًا خلاف ذلك.                                                            |
| `.-cq-show-min-medium`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`.                                        |
| `.-cq-show-min-mobile`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`.                                        |
| `.-cq-show-min-phablet`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`.                                        |
| `.-cq-show-min-sm`                   | عرض عندما تكون الحاوية المحددة عند حد `sm` أو فوقه (`20em`); مخفيًا خلاف ذلك.                                                            |
| `.-cq-show-min-small`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`.                                        |
| `.-cq-show-min-tablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`.                                        |
| `.-cq-show-min-x-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`.                                        |
| `.-cq-show-min-x-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`.                                        |
| `.-cq-show-min-xl`                   | عرض عندما تكون الحاوية المحددة عند حد `xl` أو فوقه (`62em`); مخفيًا خلاف ذلك.                                                            |
| `.-cq-show-min-xs`                   | عرض عندما تكون الحاوية المحددة عند حد `xs` أو فوقه (`16em`); مخفيًا خلاف ذلك.                                                            |
| `.-hidden-max-content`               | إخفاء عندما تكون منطقة المشاهدة عند حد `content` أو تحته (`68.75em`).                                                                    |
| `.-hidden-max-content-full-width`    | إخفاء عندما تكون منطقة المشاهدة عند حد `content-full-width` أو تحته (`98.75em`).                                                         |
| `.-hidden-max-desktop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`.                                         |
| `.-hidden-max-laptop`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`.                                         |
| `.-hidden-max-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`.                                         |
| `.-hidden-max-lg`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `lg` أو تحته (`48em`).                                                                            |
| `.-hidden-max-md`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `md` أو تحته (`30em`).                                                                            |
| `.-hidden-max-medium`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`.                                         |
| `.-hidden-max-mobile`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`.                                         |
| `.-hidden-max-phablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`.                                         |
| `.-hidden-max-sm`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `sm` أو تحته (`20em`).                                                                            |
| `.-hidden-max-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`.                                         |
| `.-hidden-max-tablet`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`.                                         |
| `.-hidden-max-x-large`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`.                                         |
| `.-hidden-max-x-small`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`.                                         |
| `.-hidden-max-xl`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `xl` أو تحته (`62em`).                                                                            |
| `.-hidden-max-xs`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `xs` أو تحته (`16em`).                                                                            |
| `.-hidden-min-content`               | إخفاء عندما تكون منطقة المشاهدة عند حد `content` أو فوقه (`68.75em`).                                                                    |
| `.-hidden-min-content-full-width`    | إخفاء عندما تكون منطقة المشاهدة عند حد `content-full-width` أو فوقه (`98.75em`).                                                         |
| `.-hidden-min-desktop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`.                                         |
| `.-hidden-min-laptop`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`.                                         |
| `.-hidden-min-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`.                                         |
| `.-hidden-min-lg`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `lg` أو فوقه (`48em`).                                                                            |
| `.-hidden-min-md`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `md` أو فوقه (`30em`).                                                                            |
| `.-hidden-min-medium`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`.                                         |
| `.-hidden-min-mobile`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`.                                         |
| `.-hidden-min-phablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`.                                         |
| `.-hidden-min-sm`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `sm` أو فوقه (`20em`).                                                                            |
| `.-hidden-min-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`.                                         |
| `.-hidden-min-tablet`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`.                                         |
| `.-hidden-min-x-large`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`.                                         |
| `.-hidden-min-x-small`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`.                                         |
| `.-hidden-min-xl`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `xl` أو فوقه (`62em`).                                                                            |
| `.-hidden-min-xs`                    | إخفاء عندما تكون منطقة المشاهدة عند حد `xs` أو فوقه (`16em`).                                                                            |
| `.-show-max-content`                 | عرض (معكوس `-hidden-min-content`) عندما تكون منطقة المشاهدة عند حد `content` أو تحته (`68.75em`); مخفيًا خلاف ذلك.                       |
| `.-show-max-content-full-width`      | عرض (معكوس `-hidden-min-content-full-width`) عندما تكون منطقة المشاهدة عند حد `content-full-width` أو تحته (`98.75em`); مخفيًا خلاف ذلك. |
| `.-show-max-desktop`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`.                                           |
| `.-show-max-laptop`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`.                                           |
| `.-show-max-large`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`.                                           |
| `.-show-max-lg`                      | عرض (معكوس `-hidden-min-lg`) عندما تكون منطقة المشاهدة عند حد `lg` أو تحته (`48em`); مخفيًا خلاف ذلك.                                    |
| `.-show-max-md`                      | عرض (معكوس `-hidden-min-md`) عندما تكون منطقة المشاهدة عند حد `md` أو تحته (`30em`); مخفيًا خلاف ذلك.                                    |
| `.-show-max-medium`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`.                                           |
| `.-show-max-mobile`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`.                                           |
| `.-show-max-phablet`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`.                                           |
| `.-show-max-sm`                      | عرض (معكوس `-hidden-min-sm`) عندما تكون منطقة المشاهدة عند حد `sm` أو تحته (`20em`); مخفيًا خلاف ذلك.                                    |
| `.-show-max-small`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`.                                           |
| `.-show-max-tablet`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`.                                           |
| `.-show-max-x-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`.                                           |
| `.-show-max-x-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`.                                           |
| `.-show-max-xl`                      | عرض (معكوس `-hidden-min-xl`) عندما تكون منطقة المشاهدة عند حد `xl` أو تحته (`62em`); مخفيًا خلاف ذلك.                                    |
| `.-show-max-xs`                      | عرض (معكوس `-hidden-min-xs`) عندما تكون منطقة المشاهدة عند حد `xs` أو تحته (`16em`); مخفيًا خلاف ذلك.                                    |
| `.-show-min-content`                 | عرض (معكوس `-hidden-max-content`) عندما تكون منطقة المشاهدة عند حد `content` أو فوقه (`68.75em`); مخفيًا خلاف ذلك.                       |
| `.-show-min-content-full-width`      | عرض (معكوس `-hidden-max-content-full-width`) عندما تكون منطقة المشاهدة عند حد `content-full-width` أو فوقه (`98.75em`); مخفيًا خلاف ذلك. |
| `.-show-min-desktop`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`.                                           |
| `.-show-min-laptop`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`.                                           |
| `.-show-min-large`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`.                                           |
| `.-show-min-lg`                      | اعرض (معكوس `-hidden-max-lg`) عندما تكون منطقة العرض في أو فوق نقطة التوقف `lg` (`48em`); مخفي بخلاف ذلك.                                |
| `.-show-min-md`                      | اعرض (معكوس `-hidden-max-md`) عندما تكون منطقة العرض في أو فوق نقطة التوقف `md` (`30em`); مخفي بخلاف ذلك.                                |
| `.-show-min-medium`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`.                                           |
| `.-show-min-mobile`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`.                                           |
| `.-show-min-phablet`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`.                                           |
| `.-show-min-sm`                      | اعرض (معكوس `-hidden-max-sm`) عندما تكون منطقة العرض في أو فوق نقطة التوقف `sm` (`20em`); مخفي بخلاف ذلك.                                |
| `.-show-min-small`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`.                                           |
| `.-show-min-tablet`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`.                                           |
| `.-show-min-x-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`.                                           |
| `.-show-min-x-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`.                                           |
| `.-show-min-xl`                      | اعرض (معكوس `-hidden-max-xl`) عندما تكون منطقة العرض في أو فوق نقطة التوقف `xl` (`62em`); مخفي بخلاف ذلك.                                |
| `.-show-min-xs`                      | اعرض (معكوس `-hidden-max-xs`) عندما تكون منطقة العرض في أو فوق نقطة التوقف `xs` (`16em`); مخفي بخلاف ذلك.                                |

## Custom properties

| Property                           | Type       | Default   | Description                                                                                                                                                 |
| ---------------------------------- | ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--pantoken-bp-content`            | `<length>` | `68.75em` | قيمة نقطة التوقف `content` (`68.75em`، مكتوبة يدويًا، ذات طابع (ليست في IR للرموز)). تجاوزها لا ينقل عتبات `@media`/`@container` المترجمة أعلاه.            |
| `--pantoken-bp-content-full-width` | `<length>` | `98.75em` | قيمة نقطة التوقف `content-full-width` (`98.75em`، مكتوبة يدويًا، ذات طابع (ليست في IR للرموز)). تجاوزها لا ينقل عتبات `@media`/`@container` المترجمة أعلاه. |
| `--pantoken-bp-lg`                 | `<length>` | `48em`    | قيمة نقطة التوقف `lg` (`48em`، تعكس `--instui-component-tray-width-lg`). تجاوزها لا ينقل عتبات `@media`/`@container` المترجمة أعلاه.                        |
| `--pantoken-bp-md`                 | `<length>` | `30em`    | قيمة نقطة التوقف `md` (`30em`، تعكس `--instui-component-tray-width-md`). تجاوزها لا ينقل عتبات `@media`/`@container` المترجمة أعلاه.                        |
| `--pantoken-bp-sm`                 | `<length>` | `20em`    | قيمة نقطة التوقف `sm` (`20em`، تعكس `--instui-component-tray-width-sm`). تجاوزها لا ينقل عتبات `@media`/`@container` المترجمة أعلاه.                        |
| `--pantoken-bp-xl`                 | `<length>` | `62em`    | قيمة نقطة التوقف `xl` (`62em`، تعكس `--instui-component-tray-width-xl`). تجاوزها لا ينقل عتبات `@media`/`@container` المترجمة أعلاه.                        |
| `--pantoken-bp-xs`                 | `<length>` | `16em`    | قيمة نقطة التوقف `xs` (`16em`، تعكس `--instui-component-tray-width-xs`). تجاوزها لا ينقل عتبات `@media`/`@container` المترجمة أعلاه.                        |

## Conditions

| Type      | Query                  | Description                                                                  |
| --------- | ---------------------- | ---------------------------------------------------------------------------- |
| media     | `(max-width: 16em)`    | الحد الأعلى لنقطة التوقف `xs`.                                               |
| media     | `(min-width: 16em)`    | الحد الأدنى لنقطة التوقف `xs`.                                               |
| media     | `(max-width: 20em)`    | الحد الأعلى لنقطة التوقف `sm`.                                               |
| media     | `(min-width: 20em)`    | الحد الأدنى لنقطة التوقف `sm`.                                               |
| media     | `(max-width: 30em)`    | الحد الأعلى لنقطة التوقف `md`.                                               |
| media     | `(min-width: 30em)`    | الحد الأدنى لنقطة التوقف `md`.                                               |
| media     | `(max-width: 48em)`    | الحد الأعلى لنقطة التوقف `lg`.                                               |
| media     | `(min-width: 48em)`    | الحد الأدنى لنقطة التوقف `lg`.                                               |
| media     | `(max-width: 62em)`    | الحد الأعلى لنقطة التوقف `xl`.                                               |
| media     | `(min-width: 62em)`    | الحد الأدنى لنقطة التوقف `xl`.                                               |
| media     | `(max-width: 68.75em)` | الحد الأعلى لنقطة التوقف `content`.                                          |
| media     | `(min-width: 68.75em)` | الحد الأدنى لنقطة التوقف `content`.                                          |
| media     | `(max-width: 98.75em)` | الحد الأعلى لنقطة التوقف `content-full-width`.                               |
| media     | `(min-width: 98.75em)` | الحد الأدنى لنقطة التوقف `content-full-width`.                               |
| container | `(max-width: 16em)`    | الحد الأعلى لنقطة التوقف `xs`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(min-width: 16em)`    | الحد الأدنى لنقطة التوقف `xs`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(max-width: 20em)`    | الحد الأعلى لنقطة التوقف `sm`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(min-width: 20em)`    | الحد الأدنى لنقطة التوقف `sm`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(max-width: 30em)`    | الحد الأعلى لنقطة التوقف `md`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(min-width: 30em)`    | الحد الأدنى لنقطة التوقف `md`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(max-width: 48em)`    | الحد الأعلى لنقطة التوقف `lg`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(min-width: 48em)`    | الحد الأدنى لنقطة التوقف `lg`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(max-width: 62em)`    | الحد الأعلى لنقطة التوقف `xl`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(min-width: 62em)`    | الحد الأدنى لنقطة التوقف `xl`، يتم تقييمه مقابل حاوية معلمة.                 |
| container | `(max-width: 68.75em)` | الحد الأعلى لنقطة التوقف `content`، يتم تقييمه مقابل حاوية معلمة.            |
| container | `(min-width: 68.75em)` | الحد الأدنى لنقطة التوقف `content`، يتم تقييمه مقابل حاوية معلمة.            |
| container | `(max-width: 98.75em)` | الحد الأعلى لنقطة التوقف `content-full-width`، يتم تقييمه مقابل حاوية معلمة. |
| container | `(min-width: 98.75em)` | الحد الأدنى لنقطة التوقف `content-full-width`، يتم تقييمه مقابل حاوية معلمة. |

## Tokens consumed

| Token                              | Type       | Value  |
| ---------------------------------- | ---------- | ------ |
| `--instui-component-tray-width-lg` | `<length>` | `48em` |
| `--instui-component-tray-width-md` | `<length>` | `30em` |
| `--instui-component-tray-width-sm` | `<length>` | `20em` |
| `--instui-component-tray-width-xl` | `<length>` | `62em` |
| `--instui-component-tray-width-xs` | `<length>` | `16em` |

# CSS: button

`.instui-button` — تحكم إجراء يسهل الوصول إليه، مصمم من لوحة الرموز؛ أساسي بشكل افتراضي.

تتراكم متغيرات الذكاء الاصطناعي درجتين لونيتين — ملء صندوق الحشو وسكتة حد الصندوق — لإطارهم، و`-color-ai-secondary` لا يمكنه رسم نص بتدرج لوني وملء في نفس الوقت، لذا يبقى مركزه شفافًا في حالة الراحة ويملأ عند التمرير أو التفعيل. الشبح عند التمرير والتفعيل يستخلصان غسيل العلامة التجارية منخفض العتامة وقليلاً مظلم بدلاً من استخدام رموز خلفية التمرير الأولية، والتي ستطبع نصًا باللون ذاته على اللون ذاته. يعيّن أيضًا `gap` الخاص به للرمز/التسمية و`padding` الأفقي؛ ربط معدّل أداة تباعد `-gap-*`/`-p-*`/`-padding-*` يتجاوز تلك القيم المدمجة.

**المصدر:** [button.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/button/button.css)

## Accessibility

قيّد حالة ضغط متغير `-toggle` بـ `aria-pressed`، وضع علامة على زر معطّل بـ `aria-disabled` (أو `disabled` الأصلي).

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/button.css";
```

## Demo

```demo
self:button
```

## Examples

```html
<button class="instui-button">Primary</button>
<button class="instui-button -color-secondary">Secondary</button>
```

## Modifiers

| Modifier                  | Description                                                                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.-color-ai`              | إجراء ذكاء اصطناعي.                                                                                                                                         |
| `.-color-ai-secondary`    | إجراء ذكاء اصطناعي أقل تركيزًا.                                                                                                                             |
| `.-color-danger`          | إجراء مدمّر.                                                                                                                                                |
| `.-color-primary`         | (افتراضي) الإجراء الأساسي.                                                                                                                                  |
| `.-color-primary-inverse` | الإجراء الأساسي للخلفيات الداكنة.                                                                                                                           |
| `.-color-secondary`       | إجراء ثانوي أقل تركيزًا.                                                                                                                                    |
| `.-color-success`         | إجراء إيجابي/تأكيدي.                                                                                                                                        |
| `.-color-tertiary`        | إجراء بنمط النص (بدون ملء أو حد حتى التمرير).                                                                                                               |
| `.-condensed`             | حشو أضيق للشرائط الأدوات الكثيفة.                                                                                                                           |
| `.-display-block`         | زر كتلة بعرض كامل.                                                                                                                                          |
| `.-ghost`                 | نمط المخطط (الشبح): حد بألوان الرموز الشبحية للون، بدون ملء.                                                                                                |
| `.-icon-*`                | اعرض حرفًا من مجموعة الرموز قبل التسمية (على سبيل المثال `-icon-arrow-right`)، مرسومًا بلون نص الزر؛ اقرن مع `-shape-square`/`-shape-circle` لزر الرمز فقط. |
| `.-shape-circle`          | زر رمز دائري.                                                                                                                                               |
| `.-shape-square`          | زر رمز مربع.                                                                                                                                                |
| `.-size-large`            | كبير. اسم مستعار طويل الشكل لـ `-size-lg`.                                                                                                                  |
| `.-size-lg`               | كبير.                                                                                                                                                       |
| `.-size-md`               | (افتراضي) حجم متوسط.                                                                                                                                        |
| `.-size-medium`           | (افتراضي) حجم متوسط. اسم مستعار طويل لـ `-size-md`.                                                                                                         |
| `.-size-sm`               | صغير.                                                                                                                                                       |
| `.-size-small`            | صغير. اسم مستعار طويل الشكل لـ `-size-sm`.                                                                                                                  |
| `.-toggle`                | زر تبديل حالة مضغوط (يحركه aria-pressed).                                                                                                                   |
| `.-without-background`    | أسقط الملء (الشبح).                                                                                                                                         |
| `.-without-border`        | أزل الحد.                                                                                                                                                   |

## Pseudo-elements

| Pseudo-element | Description                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------- |
| `::after`      | حلقة حد التدرج اللوني الثانوي للذكاء الاصطناعي، مقنعة لإطار الزر فقط.                        |
| `::before`     | حرف الذكاء الاصطناعي، يُضاف تلقائيًا إلى أزرار الذكاء الاصطناعي ومقنع بلون المتغير الخاص به. |

## States

| State                    | Description |
| ------------------------ | ----------- |
| `[aria-disabled="true"]` | —           |
| `[aria-pressed="true"]`  | —           |
| `:disabled`              | —           |
| `:state(pressed)`        | —           |

## Tokens consumed

| Token                                                                              | Type                                               | Value                                                                        |
| ---------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-border-width-md`                                                         | `<length>`                                         | `0.125rem`                                                                   |
| `--instui-border-width-sm`                                                         | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-color-background-interactive-action-ai-bottom-gradient-active`           | `<color>`                                          | `#01626E`                                                                    |
| `--instui-color-background-interactive-action-ai-bottom-gradient-base`             | `<color>`                                          | `#027887`                                                                    |
| `--instui-color-background-interactive-action-ai-bottom-gradient-hover`            | `<color>`                                          | `#00828E`                                                                    |
| `--instui-color-background-interactive-action-ai-secondary-active-bottom-gradient` | `<color>`                                          | `light-dark(#CFF0F6, #00424A)`                                               |
| `--instui-color-background-interactive-action-ai-secondary-active-top-gradient`    | `<color>`                                          | `light-dark(#F3E5F7, #522965)`                                               |
| `--instui-color-background-interactive-action-ai-secondary-hover-bottom-gradient`  | `<color>`                                          | `light-dark(#CFF0F6, #00424A)`                                               |
| `--instui-color-background-interactive-action-ai-secondary-hover-top-gradient`     | `<color>`                                          | `light-dark(#F3E5F7, #522965)`                                               |
| `--instui-color-background-interactive-action-ai-top-gradient-active`              | `<color>`                                          | `#793F93`                                                                    |
| `--instui-color-background-interactive-action-ai-top-gradient-base`                | `<color>`                                          | `#944FB3`                                                                    |
| `--instui-color-background-interactive-action-ai-top-gradient-hover`               | `<color>`                                          | `#9E58BD`                                                                    |
| `--instui-color-background-interactive-action-destructive-active`                  | `<color>`                                          | `#AE161B`                                                                    |
| `--instui-color-background-interactive-action-destructive-base`                    | `<color>`                                          | `#CF1F24`                                                                    |
| `--instui-color-background-interactive-action-destructive-hover`                   | `<color>`                                          | `#E62429`                                                                    |
| `--instui-color-background-interactive-action-primary-active`                      | `<color>`                                          | `light-dark(#061C30, #D5E2F6)`                                               |
| `--instui-color-background-interactive-action-primary-base`                        | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-color-background-interactive-action-primary-disabled`                    | `<color>`                                          | `light-dark(#DFE1E3, #334450)`                                               |
| `--instui-color-background-interactive-action-primary-hover`                       | `<color>`                                          | `light-dark(#234465, #ffffff)`                                               |
| `--instui-color-background-interactive-action-secondary-active`                    | `<color>`                                          | `light-dark(#44709F, #2E5177)`                                               |
| `--instui-color-background-interactive-action-secondary-base`                      | `<color>`                                          | `light-dark(#44709F, #345B84)`                                               |
| `--instui-color-background-interactive-action-secondary-hover`                     | `<color>`                                          | `light-dark(#44709F, #3E6895)`                                               |
| `--instui-color-background-interactive-action-success-base`                        | `<color>`                                          | `#037D37`                                                                    |
| `--instui-color-background-interactive-action-success-hover`                       | `<color>`                                          | `#03893D`                                                                    |
| `--instui-color-background-interactive-action-tertiary-active`                     | `<color>`                                          | `light-dark(#E2EAF7, #234465)`                                               |
| `--instui-color-background-interactive-action-tertiary-hover`                      | `<color>`                                          | `light-dark(#EEF4FD, #2E5177)`                                               |
| `--instui-color-background-muted`                                                  | `<color>`                                          | `light-dark(#F2F4F5, #273540)`                                               |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-active`               | `<color>`                                          | `light-dark(#01626E, #02717E)`                                               |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-base`                 | `<color>`                                          | `#027887`                                                                    |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-hover`                | `<color>`                                          | `#00828E`                                                                    |
| `--instui-color-stroke-interactive-action-ai-top-gradient-active`                  | `<color>`                                          | `light-dark(#793F93, #8A49A7)`                                               |
| `--instui-color-stroke-interactive-action-ai-top-gradient-base`                    | `<color>`                                          | `#944FB3`                                                                    |
| `--instui-color-stroke-interactive-action-ai-top-gradient-hover`                   | `<color>`                                          | `#9E58BD`                                                                    |
| `--instui-color-stroke-interactive-action-primary-active`                          | `<color>`                                          | `light-dark(#061C30, #D5E2F6)`                                               |
| `--instui-color-stroke-interactive-action-primary-base`                            | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-color-stroke-interactive-action-primary-hover`                           | `<color>`                                          | `light-dark(#234465, #ffffff)`                                               |
| `--instui-color-stroke-interactive-action-secondary-active`                        | `<color>`                                          | `light-dark(#44709F, #2E5177)`                                               |
| `--instui-color-stroke-interactive-action-secondary-base`                          | `<color>`                                          | `light-dark(#44709F, #345B84)`                                               |
| `--instui-color-stroke-interactive-action-secondary-hover`                         | `<color>`                                          | `light-dark(#44709F, #3E6895)`                                               |
| `--instui-color-stroke-interactive-action-tertiary-base`                           | `<color>`                                          | `light-dark(#86A8D5, #7097C7)`                                               |
| `--instui-color-text-interactive-action-ai-active`                                 | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-ai-base`                                   | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-ai-hover`                                  | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base`         | `<color>`                                          | `light-dark(#027887, #3CC0D4)`                                               |
| `--instui-color-text-interactive-action-ai-secondary-top-gradient-base`            | `<color>`                                          | `light-dark(#944FB3, #CAA1D9)`                                               |
| `--instui-color-text-interactive-action-primary-base`                              | `<color>`                                          | `light-dark(#ffffff, #1D354F)`                                               |
| `--instui-color-text-interactive-action-primary-disabled`                          | `<color>`                                          | `light-dark(#9EA6AD, #6A7883)`                                               |
| `--instui-color-text-interactive-action-secondary-base`                            | `<color>`                                          | `light-dark(#1D354F, #ffffff)`                                               |
| `--instui-color-text-interactive-action-status-base`                               | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-tertiary-base`                             | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-base-button-border-radius`                                     | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-base-button-large-font-size`                                   | `<length>`                                         | `1.125rem`                                                                   |
| `--instui-component-base-button-large-height`                                      | `<length>`                                         | `3rem`                                                                       |
| `--instui-component-base-button-large-padding-horizontal`                          | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-base-button-medium-font-size`                                  | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-base-button-medium-height`                                     | `<length>`                                         | `2.5rem`                                                                     |
| `--instui-component-base-button-medium-padding-horizontal`                         | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-base-button-primary-ghost-background`                          | `<color>`                                          | `transparent`                                                                |
| `--instui-component-base-button-primary-ghost-border-color`                        | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-base-button-primary-ghost-color`                               | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-base-button-primary-inverse-active-background`                 | `<color>`                                          | `#B6CCEA`                                                                    |
| `--instui-component-base-button-primary-inverse-background`                        | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-base-button-primary-inverse-border-color`                      | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-base-button-primary-inverse-color`                             | `<color>`                                          | `#213D5B`                                                                    |
| `--instui-component-base-button-primary-inverse-hover-background`                  | `<color>`                                          | `#D5E2F6`                                                                    |
| `--instui-component-base-button-primary-on-color-active-border-color`              | `<color>`                                          | `#B6CCEA`                                                                    |
| `--instui-component-base-button-primary-on-color-hover-border-color`               | `<color>`                                          | `#D5E2F6`                                                                    |
| `--instui-component-base-button-secondary-ghost-background`                        | `<color>`                                          | `transparent`                                                                |
| `--instui-component-base-button-secondary-ghost-border-color`                      | `<color>`                                          | `light-dark(#1D354F, #ffffff)`                                               |
| `--instui-component-base-button-secondary-ghost-color`                             | `<color>`                                          | `light-dark(#1D354F, #ffffff)`                                               |
| `--instui-component-base-button-small-font-size`                                   | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-base-button-small-height`                                      | `<length>`                                         | `2rem`                                                                       |
| `--instui-component-base-button-small-padding-horizontal`                          | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-font-family-base`                                                        | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-font-weight-interactive`                                                 | `<integer>`                                        | `500`                                                                        |
| `--instui-line-height-standalone-text-base`                                        | `<length>`                                         | `1rem`                                                                       |
| `--instui-spacing-space-xs`                                                        | `<length>`                                         | `0.25rem`                                                                    |

## Related

- [close-button](/ar/api/css/close-button.md) — زر الإغلاق الذي يحتوي على رمز فقط.

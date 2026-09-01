# CSS: heading

`.instui-heading` — تايبوغرافيا العنوان من `-level-h1` إلى `-level-h6`.

تحكمات `-variant-*` تستبدل حجم الخط ووزن الخط لعنصر `-level-*`، لذا اجمع فقط واحدًا من كل عائلة لكل عنصر.

**المصدر:** [heading.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/heading/heading.css)

## سهولة الوصول

تعيّن هذه الأصناف المستوى البصري فقط، لذا قم بعرض عنصر `&lt;h1&gt;`–`&lt;h6&gt;` حقيقي (أو استخدم `role="heading"` مع `aria-level`) لنقل مستوى العنوان.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/heading.css";
```

## أمثلة

```html
<div class="instui-heading -level-h1">Heading h1</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-border-bottom` | أضف قاعدة سفلية. |
| `.-border-top` | أضف قاعدة علوية. |
| `.-color-ai` | لون تمييز الذكاء الاصطناعي. |
| `.-color-primary` | (الافتراضي) اللون الأساسي. |
| `.-color-primary-inverse` | لون على-داكن (معكوس الأساسي). |
| `.-color-secondary` | اللون الثانوي (المخمّد). |
| `.-level-h1` | العرض بمقياس النوع h1. |
| `.-level-h2` | العرض بمقياس النوع h2. |
| `.-level-h3` | العرض بمقياس النوع h3. |
| `.-level-h4` | العرض بمقياس النوع h4. |
| `.-level-h5` | العرض بمقياس النوع h5. |
| `.-level-h6` | العرض بمقياس النوع h6. |
| `.-variant-label` | إعداد نوع الملصق. |
| `.-variant-title-card-mini` | إعداد عنوان البطاقة المصغّرة. |
| `.-variant-title-card-regular` | إعداد عنوان البطاقة العادي. |
| `.-variant-title-card-section` | إعداد عنوان قسم البطاقة. |
| `.-variant-title-page` | إعداد عنوان الصفحة. |
| `.-variant-title-section` | إعداد عنوان القسم. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-heading-ai-text-bottom-gradient-color` | `<color>` | `light-dark(#027887, #3CC0D4)` |
| `--instui-component-heading-ai-text-top-gradient-color` | `<color>` | `light-dark(#944FB3, #CAA1D9)` |
| `--instui-component-heading-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-heading-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-heading-border-padding` | `<length>` | `0.125rem` |
| `--instui-component-heading-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-heading-h1-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-heading-h1-font-size` | `<length>` | `2.5rem` |
| `--instui-component-heading-h1-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h2-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-h2-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-h3-font-size` | `<length>` | `1.25rem` |
| `--instui-component-heading-h3-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h4-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-h4-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h5-font-size` | `<length>` | `0.875rem` |
| `--instui-component-heading-h5-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-h6-font-size` | `<length>` | `0.75rem` |
| `--instui-component-heading-h6-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-inverse-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-heading-label-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-label-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-line-height` | `<percentage>` | `125%` |
| `--instui-component-heading-muted-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-heading-title-card-mini-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-title-card-mini-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-card-regular-font-size` | `<length>` | `1.25rem` |
| `--instui-component-heading-title-card-regular-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-card-section-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-title-card-section-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-page-desktop-font-size` | `<length>` | `2.5rem` |
| `--instui-component-heading-title-page-desktop-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-section-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-title-section-font-weight` | `<integer>` | `700` |

## ذات صلة

- [text](/ar/api/css/text.md) — تايبوغرافيا الجسم للنص غير العنواني.


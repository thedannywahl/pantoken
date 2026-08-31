# CSS: heading

`.instui-heading` — طباعة العنوان من `-level-h1` إلى `-level-h6`.

تستبدل إعدادات `-variant-*` المسبقة حجم الخط ووزن الخط للعنصر `-level-*`، لذا ادمج عائلة واحدة فقط من كل عائلة لكل عنصر.

**المصدر:** [heading.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/heading/heading.css)

## Accessibility

تحدد هذه الفئات المستوى البصري فقط، لذا قم بتصيير `&lt;h1&gt;`–`&lt;h6&gt;` حقيقي (أو استخدم `role="heading"` مع `aria-level`) لنقل مستوى العنوان.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/heading.css";
```

## Examples

```html
<div class="instui-heading -level-h1">Heading h1</div>
```

## Modifiers

| Modifier                       | Description                         |
| ------------------------------ | ----------------------------------- |
| `.-border-bottom`              | أضف قاعدة في الأسفل.                |
| `.-border-top`                 | أضف قاعدة في الأعلى.                |
| `.-color-ai`                   | لون التركيز الذكي.                  |
| `.-color-primary`              | (افتراضي) اللون الأساسي.            |
| `.-color-primary-inverse`      | على الظلام (اللون الأساسي المعكوس). |
| `.-color-secondary`            | لون ثانوي (مخفوت).                  |
| `.-level-h1`                   | تصيير بمقياس نوع h1.                |
| `.-level-h2`                   | تصيير بمقياس نوع h2.                |
| `.-level-h3`                   | تصيير بمقياس نوع h3.                |
| `.-level-h4`                   | تصيير بمقياس نوع h4.                |
| `.-level-h5`                   | تصيير بمقياس نوع h5.                |
| `.-level-h6`                   | تصيير بمقياس نوع h6.                |
| `.-variant-label`              | إعداد مسبق لنوع التسمية.            |
| `.-variant-title-card-mini`    | إعداد مسبق لعنوان بطاقة صغير.       |
| `.-variant-title-card-regular` | إعداد مسبق لعنوان بطاقة عادي.       |
| `.-variant-title-card-section` | إعداد مسبق لعنوان قسم البطاقة.      |
| `.-variant-title-page`         | إعداد مسبق لعنوان الصفحة.           |
| `.-variant-title-section`      | إعداد مسبق لعنوان القسم.            |

## Tokens consumed

| Token                                                       | Type                                               | Value                                                            |
| ----------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| `--instui-component-heading-ai-text-bottom-gradient-color`  | `<color>`                                          | `light-dark(#027887, #3CC0D4)`                                   |
| `--instui-component-heading-ai-text-top-gradient-color`     | `<color>`                                          | `light-dark(#944FB3, #CAA1D9)`                                   |
| `--instui-component-heading-base-color`                     | `<color>`                                          | `light-dark(#273540, #ffffff)`                                   |
| `--instui-component-heading-border-color`                   | `<color>`                                          | `light-dark(#8D959F, #6A7883)`                                   |
| `--instui-component-heading-border-padding`                 | `<length>`                                         | `0.125rem`                                                       |
| `--instui-component-heading-border-width`                   | `<length>`                                         | `0.0625rem`                                                      |
| `--instui-component-heading-h1-font-family`                 | `[ <font-family-name> \| <generic-font-family> ]#` | `Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-heading-h1-font-size`                   | `<length>`                                         | `2.5rem`                                                         |
| `--instui-component-heading-h1-font-weight`                 | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-h2-font-size`                   | `<length>`                                         | `1.75rem`                                                        |
| `--instui-component-heading-h2-font-weight`                 | `<integer>`                                        | `600`                                                            |
| `--instui-component-heading-h3-font-size`                   | `<length>`                                         | `1.25rem`                                                        |
| `--instui-component-heading-h3-font-weight`                 | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-h4-font-size`                   | `<length>`                                         | `1rem`                                                           |
| `--instui-component-heading-h4-font-weight`                 | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-h5-font-size`                   | `<length>`                                         | `0.875rem`                                                       |
| `--instui-component-heading-h5-font-weight`                 | `<integer>`                                        | `600`                                                            |
| `--instui-component-heading-h6-font-size`                   | `<length>`                                         | `0.75rem`                                                        |
| `--instui-component-heading-h6-font-weight`                 | `<integer>`                                        | `600`                                                            |
| `--instui-component-heading-inverse-color`                  | `<color>`                                          | `light-dark(#ffffff, #1C222B)`                                   |
| `--instui-component-heading-label-font-size`                | `<length>`                                         | `1rem`                                                           |
| `--instui-component-heading-label-font-weight`              | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-line-height`                    | `<percentage>`                                     | `125%`                                                           |
| `--instui-component-heading-muted-color`                    | `<color>`                                          | `light-dark(#576773, #AAB0B5)`                                   |
| `--instui-component-heading-title-card-mini-font-size`      | `<length>`                                         | `1rem`                                                           |
| `--instui-component-heading-title-card-mini-font-weight`    | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-title-card-regular-font-size`   | `<length>`                                         | `1.25rem`                                                        |
| `--instui-component-heading-title-card-regular-font-weight` | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-title-card-section-font-size`   | `<length>`                                         | `1.75rem`                                                        |
| `--instui-component-heading-title-card-section-font-weight` | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-title-page-desktop-font-size`   | `<length>`                                         | `2.5rem`                                                         |
| `--instui-component-heading-title-page-desktop-font-weight` | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-title-section-font-size`        | `<length>`                                         | `1.75rem`                                                        |
| `--instui-component-heading-title-section-font-weight`      | `<integer>`                                        | `700`                                                            |

## Related

- [text](/ar/api/css/text.md) — طباعة الجسم للنص غير العنوان.

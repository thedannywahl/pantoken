# CSS: link

`.instui-link` — رابط ذو نمط مع أحجام، ونُسخة عكسية للخلفيات الداكنة، وشكلان: مضمن أو بلا نمط.

يحدد `gap` المتجاوب الخاص به بين أيقونة ونصها (`-size-sm`/`-size-lg` تقومان بتغيير مقياسه)؛ وسلسلة مُعدِّل تباعد `-gap-*` تتجاوز تلك القيمة المدمجة.

**المصدر:** [link.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/link/link.css)

## سهولة الوصول

وضع علامة على الرابط المعطّل باستخدام `aria-disabled="true"`.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/link.css";
```

## أمثلة

```html
<a class="instui-link" href="#">A styled link</a>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-color-inverse` | مخصص للخلفيات الداكنة. |
| `.-inline` | رابط مضمن، تحته خط داخل النص المتدفق. |
| `.-lg` | رابط مضمن كبير (يُستخدم مع `-inline`). |
| `.-size-large` | كبير. اسم بديل طويل لـ `-size-lg`. |
| `.-size-lg` | كبير. |
| `.-size-sm` | صغير. |
| `.-size-small` | صغير. اسم بديل طويل لـ `-size-sm`. |
| `.-sm` | رابط مضمن صغير (يُستخدم مع `-inline`). |
| `.-unstyled` | إزالة تنسيق الرابط: يرث اللون، بدون خط سفلي. |

## الحالات

| حالة | الوصف |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `:state(disabled)` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-link-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-font-size-lg` | `<length>` | `1.75rem` |
| `--instui-component-link-font-size-md` | `<length>` | `1rem` |
| `--instui-component-link-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-link-font-weight` | `<integer>` | `500` |
| `--instui-component-link-gap-lg` | `<length>` | `0.25rem` |
| `--instui-component-link-gap-md` | `<length>` | `0.25rem` |
| `--instui-component-link-gap-sm` | `<length>` | `0.125rem` |
| `--instui-component-link-inline-link-large-font-size` | `<length>` | `1.75rem` |
| `--instui-component-link-inline-link-large-font-weight` | `<integer>` | `600` |
| `--instui-component-link-inline-link-large-line-height` | `<length>` | `1.5rem` |
| `--instui-component-link-inline-link-medium-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-inline-link-medium-font-size` | `<length>` | `1rem` |
| `--instui-component-link-inline-link-medium-font-weight` | `<integer>` | `600` |
| `--instui-component-link-inline-link-medium-line-height` | `<length>` | `1.5rem` |
| `--instui-component-link-inline-link-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-link-inline-link-small-font-weight` | `<integer>` | `600` |
| `--instui-component-link-inline-link-small-line-height` | `<length>` | `0.875rem` |
| `--instui-component-link-line-height-lg` | `<length>` | `1.5rem` |
| `--instui-component-link-line-height-md` | `<length>` | `1rem` |
| `--instui-component-link-line-height-sm` | `<length>` | `0.875rem` |
| `--instui-component-link-on-color-text-color` | `<color>` | `#ffffff` |
| `--instui-component-link-on-color-text-disabled-color` | `<color>` | `light-dark(#C7CACD, #9EA6AD)` |
| `--instui-component-link-on-color-text-hover-color` | `<color>` | `light-dark(#DEEBFF, #ffffff)` |
| `--instui-component-link-text-color` | `<color>` | `light-dark(#2369A4, #7FB4F1)` |
| `--instui-component-link-text-decoration-outside-text` | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `none` |
| `--instui-component-link-text-decoration-within-text` | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `underline` |
| `--instui-component-link-text-disabled-color` | `<color>` | `light-dark(#8D959F, #576773)` |
| `--instui-component-link-text-hover-color` | `<color>` | `light-dark(#1A5281, #ACCDF7)` |
| `--instui-component-link-unstyled-text-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |

## ذات صلة

- [breadcrumb](/ar/api/css/breadcrumb.md) — مسار تجوال مكوّن من روابط؛ وهو أيضًا بديل الشاشات الصغيرة (اقتران مع أداة `responsive` لاستبدال Breadcrumb بـ Link أسفل ~768px).


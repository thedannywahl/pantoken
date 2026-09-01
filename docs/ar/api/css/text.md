# CSS: text

`.instui-text` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — نص الفقرة مع محارف الطباعة بحجم ووزن ولون ونمط قابلين للتعديل.

تُركّب إعدادات `-variant-*` المسبقة والمعدّلات `-color-*`/`-size-*`/`-weight-*` جميعها على نفس العنصر؛ وعلى عكس `heading`، فهي لا تُنشئ مستوى دلالي ضمني.

**المصدر:** [text.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text/text.css)

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text.css";
```

## أمثلة

```html
<span class="instui-text -size-xs --display-block">x-small text</span>
<span class="instui-text -size-sm --display-block">small text</span>
<span class="instui-text -variant-content-quote --display-block">Quoted text</span>
<span class="instui-text -color-ai-highlight">AI highlight text</span>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-color-ai` | <span class="instui-pill -color-danger pantoken-doc-tag">مهجور</span> — use `.-color-ai-highlight`. |
| `.-color-ai-highlight` | لون نص بلهجة AI مع تمييز خلفية. |
| `.-color-brand` | لون نص العلامة التجارية. |
| `.-color-danger` | لون نص التحذير/الخطر. |
| `.-color-primary` | اللون الأساسي للنص. |
| `.-color-primary-inverse` | لون النص على خلفية داكنة (العكسي الأساسي). |
| `.-color-primary-on` | اللون الأساسي للنص على خلفية ملونة. |
| `.-color-secondary` | اللون الثانوي (المخفف) للنص. |
| `.-color-secondary-inverse` | لون النص على خلفية داكنة (العكسي الثانوي). |
| `.-color-secondary-on` | اللون الثانوي للنص على خلفية ملونة. |
| `.-color-success` | لون نص النجاح. |
| `.-color-warning` | لون نص التحذير. |
| `.-size-large` | كبير. اسم بديل طويل المدى لـ `-size-lg`. |
| `.-size-lg` | كبير. |
| `.-size-sm` | صغير. |
| `.-size-small` | صغير. اسم بديل طويل المدى لـ `-size-sm`. |
| `.-size-x-large` | كبير جدًّا. اسم بديل طويل المدى لـ `-size-xl`. |
| `.-size-x-small` | صغير جدًّا. اسم بديل طويل المدى لـ `-size-xs`. |
| `.-size-xl` | كبير جدًّا. |
| `.-size-xs` | صغير جدًّا. |
| `.-style-italic` | مائل. |
| `.-transform-capitalize` | اجعل كل كلمة تبدأ بحرف كبير. |
| `.-transform-lowercase` | حوّل النص إلى أحرف صغيرة. |
| `.-transform-uppercase` | حوّل النص إلى أحرف كبيرة. |
| `.-variant-content` | إعداد مسبق لنوع المحتوى. |
| `.-variant-content-important` | إعداد مسبق لنوع المحتوى المهم. |
| `.-variant-content-quote` | إعداد مسبق لنوع المحتوى المقتبس. |
| `.-variant-content-small` | إعداد مسبق لنوع المحتوى الصغير. |
| `.-variant-description-page` | إعداد مسبق لوصف الصفحة. |
| `.-variant-description-section` | إعداد مسبق لوصف القسم. |
| `.-variant-legend` | إعداد مسبق لنوع العنوان (Legend). |
| `.-weight-bold` | وزن غامق. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-color-institutional-brand-font-color-dark` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-color-institutional-brand-primary` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-text-ai-background-color` | `<color>` | `light-dark(#F3E5F7, #6D3984)` |
| `--instui-component-text-ai-color` | `<color>` | `light-dark(#8A49A7, #F3E5F7)` |
| `--instui-component-text-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-text-base-on-color` | `<color>` | `#ffffff` |
| `--instui-component-text-content-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-content-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-font-weight` | `<integer>` | `400` |
| `--instui-component-text-content-important-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-important-font-weight` | `<integer>` | `600` |
| `--instui-component-text-content-important-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-quote-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-quote-font-style` | — | `italic` |
| `--instui-component-text-content-quote-font-weight` | `<integer>` | `500` |
| `--instui-component-text-content-quote-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-text-content-small-font-weight` | `<integer>` | `400` |
| `--instui-component-text-content-small-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-description-page-font-size` | `<length>` | `1.25rem` |
| `--instui-component-text-description-page-font-weight` | `<integer>` | `400` |
| `--instui-component-text-description-page-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-description-section-font-size` | `<length>` | `1rem` |
| `--instui-component-text-description-section-font-weight` | `<integer>` | `400` |
| `--instui-component-text-description-section-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-error-color` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-component-text-font-size-large` | `<length>` | `1.75rem` |
| `--instui-component-text-font-size-medium` | `<length>` | `1rem` |
| `--instui-component-text-font-size-small` | `<length>` | `0.875rem` |
| `--instui-component-text-font-size-x-large` | `<length>` | `2.5rem` |
| `--instui-component-text-font-size-x-small` | `<length>` | `0.75rem` |
| `--instui-component-text-font-weight-bold` | `<integer>` | `600` |
| `--instui-component-text-font-weight-normal` | `<integer>` | `400` |
| `--instui-component-text-inverse-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-text-legend-font-size` | `<length>` | `0.75rem` |
| `--instui-component-text-legend-font-weight` | `<integer>` | `400` |
| `--instui-component-text-legend-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-muted-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-text-muted-on-color` | `<color>` | `#ffffff` |
| `--instui-component-text-primary-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-text-success-color` | `<color>` | `light-dark(#037D37, #61C378)` |
| `--instui-component-text-warning-color` | `<color>` | `light-dark(#BB4200, #FF905A)` |

## ذات صلة

- [heading](/ar/api/css/heading.md) — الطباعة للعناوين بدلاً من نص الفقرة.
- [truncate](/ar/api/css/truncate.md) — يقتطع هذا النص إلى سطر واحد أو عدد محدد من الأسطر.


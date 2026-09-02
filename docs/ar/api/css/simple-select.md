# CSS: simple-select

`.instui-simple-select` — عنصر أصلي منسق `&lt;select&gt;` مع مؤشر نصي (caret)، متوافق مع حالات وأحجام مدخلات النص.

يغلف `&lt;select&gt;` أصلي بسيط بدون وسم مخصص للقائمة المنسدلة/القائمة، لذا يطبق العرض الخاص بالمتصفح وسلوك لوحة المفاتيح كما هو؛ ويشارك إطار الحقل الخاص به مع `text-input`.

**المصدر:** [select.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/select/select.css)

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/simple-select.css";
```

## أمثلة

```html
<select class="instui-simple-select">
  <option>Choose a fruit…</option>
  <option>Apple</option>
  <option>Orange</option>
  <option>Pear</option>
</select>
```

## الهيكل

```text
.instui-simple-select
  option
```

```mermaid
flowchart TD
  n0[".instui-simple-select"]:::cssdoc-root
  n1("option"):::cssdoc-part
  n0 --> n1
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-disabled` | حالة معطلة. |
| `.-invalid` | حالة غير صالحة (خطأ). |
| `.-readonly` | حالة للقراءة فقط. |
| `.-size-large` | كبير. تسمية مطوّلة لـ `-size-lg`. |
| `.-size-lg` | كبير. |
| `.-size-md` | (الافتراضي) متوسط. |
| `.-size-medium` | (الافتراضي) متوسط. اسم بديل طويل لـ `-size-md`. |
| `.-size-sm` | صغير. |
| `.-size-small` | صغير. تسمية مطوّلة لـ `-size-sm`. |
| `.-success` | حالة نجاح (صالحة). |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::placeholder` | نص العنصر النائب، بلون باهت يتغيّر عند التحويم. |

## الحالات

| حالة | الوصف |
| --- | --- |
| `:disabled` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-text-input-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-background-disabled-color` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-text-input-background-hover-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-background-readonly-color` | `<color>` | `light-dark(#C7CACD, #6A7883)` |
| `--instui-component-text-input-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-text-input-border-disabled-color` | `<color>` | `light-dark(#C7CACD, #4A5B68)` |
| `--instui-component-text-input-border-hover-color` | `<color>` | `light-dark(#334450, #7E8792)` |
| `--instui-component-text-input-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-text-input-border-readonly-color` | `<color>` | `#8D959F` |
| `--instui-component-text-input-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-text-input-error-border-color` | `<color>` | `light-dark(#CF1F24, #F56050)` |
| `--instui-component-text-input-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-input-font-size-lg` | `<length>` | `1.25rem` |
| `--instui-component-text-input-font-size-md` | `<length>` | `1rem` |
| `--instui-component-text-input-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-text-input-font-weight` | `<integer>` | `500` |
| `--instui-component-text-input-height-lg` | `<length>` | `3rem` |
| `--instui-component-text-input-height-md` | `<length>` | `2.5rem` |
| `--instui-component-text-input-height-sm` | `<length>` | `2rem` |
| `--instui-component-text-input-padding-horizontal-lg` | `<length>` | `0.75rem` |
| `--instui-component-text-input-padding-horizontal-md` | `<length>` | `0.75rem` |
| `--instui-component-text-input-padding-horizontal-sm` | `<length>` | `0.5rem` |
| `--instui-component-text-input-placeholder-color` | `<color>` | `light-dark(#5F6E7A, #7E8792)` |
| `--instui-component-text-input-placeholder-hover-color` | `<color>` | `light-dark(#334450, #9EA6AD)` |
| `--instui-component-text-input-success-border-color` | `<color>` | `light-dark(#037D37, #3EA75B)` |
| `--instui-component-text-input-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-text-input-text-disabled-color` | `<color>` | `light-dark(#8D959F, #9EA6AD)` |
| `--instui-component-text-input-text-readonly-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-focus-outline-color-danger` | `auto \| <color>` | — |
| `--instui-focus-outline-color-success` | `auto \| <color>` | — |

## ذات صلة

- [text-input](/ar/api/css/text-input.md) — يشارك نفس إطار الحقل والحالات والأحجام.
- [menu](/ar/api/css/menu.md) — السطح المنسدل الذي يعيد استخدامه select الأغنى.


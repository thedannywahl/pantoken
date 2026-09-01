# CSS: spinner

`.instui-spinner` — حلقة تحميل متحركة؛ أعطها role="status" و aria-label.

`-color-inverse` يعيد طلاء الجزء العلوي المتحرك من الحدود فقط، وليس المسار بأكمله، لذا يظل مقروءًا بشكل صحيح على بطاقة داكنة دون الحاجة إلى لون مسار منفصل.

**المصدر:** [spinner.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/spinner/spinner.css)

## سهولة الوصول

أعطِ مؤشر التحميل role="status" و aria-label ليعلنه قارئو الشاشة على أنه حالة تحميل مباشرة.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/spinner.css";
```

## عرض توضيحي

```demo
self:spinner
```

## أمثلة

```html
<span class="instui-spinner" role="status" aria-label="Loading"></span>
```
### Inverse color -nocard
```html
<div class="instui-view instui-card -background-primary-inverse">
  <span class="instui-spinner -color-inverse" role="status" aria-label="Loading"></span>
</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-color-inverse` | على سطح داكن. |
| `.-size-large` | كبير. اسم بديل مطوّل لـ `-size-lg`. |
| `.-size-lg` | كبير. |
| `.-size-sm` | صغير. |
| `.-size-small` | صغير. اسم بديل مطوّل لـ `-size-sm`. |
| `.-size-x-small` | صغير جدًا. اسم بديل مطوّل لـ `-size-xs`. |
| `.-size-xs` | صغير جدًا. |

## التحريكات

| تحريك | الوصف |
| --- | --- |
| `pantoken-spinner-rotate` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-spinner-color` | `<color>` | `light-dark(#2871AF, #7FB4F1)` |
| `--instui-component-spinner-inverse-color` | `<color>` | `#ffffff` |
| `--instui-component-spinner-spinner-size-lg` | `<length>` | `4.5rem` |
| `--instui-component-spinner-spinner-size-md` | `<length>` | `3.5rem` |
| `--instui-component-spinner-spinner-size-sm` | `<length>` | `2rem` |
| `--instui-component-spinner-spinner-size-xs` | `<length>` | `1rem` |
| `--instui-component-spinner-stroke-width-lg` | `<length>` | `0.75em` |
| `--instui-component-spinner-stroke-width-md` | `<length>` | `0.5em` |
| `--instui-component-spinner-stroke-width-sm` | `<length>` | `0.375em` |
| `--instui-component-spinner-stroke-width-xs` | `<length>` | `0.25em` |
| `--instui-component-spinner-track-color` | `<color>` | `light-dark(rgba(35,68,101,0.1), rgba(255,255,255,0.1))` |


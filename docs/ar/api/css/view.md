# CSS: view

`.instui-view` — بدائية View: مربع محايد مع معدِّلات مفتاح-قيمة للخلفية، الحافة، النصف القُطر، الظل، العرض، الوضع، التدفق، والمؤشر. كل واحد من هذه المعدِّلات متاح أيضاً على مستوى النظام (عاري، أو مرتبط بأي مكوّن آخر) — انظر أدوات `background`/`border`/`shadow`/`display`/`position`/`overflow`/`cursor`.

**المصدر:** [view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/view/view.css)

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/view.css";
```

## أمثلة

```html
<div class="instui-view -background-secondary -border-radius-medium -shadow-resting">
  A card-like surface.
</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-background-alert` | خلفية سطح التنبيه. |
| `.-background-brand` | خلفية سطح العلامة التجارية. |
| `.-background-danger` | خلفية سطح الخطر. |
| `.-background-info` | خلفية سطح المعلومات. |
| `.-background-primary` | خلفية السطح الأساسي (Primary). |
| `.-background-primary-inverse` | خلفية السطح المعكوس للعنصر الأساسي. |
| `.-background-secondary` | خلفية السطح الثانوي. |
| `.-background-success` | خلفية سطح النجاح. |
| `.-background-transparent` | خلفية شفافة. |
| `.-background-warning` | خلفية سطح التحذير. |
| `.-border-color-brand` | لون حد الضربة الخاص بالعلامة التجارية. |
| `.-border-color-danger` | لون حد الضربة الخاص بالخطأ. |
| `.-border-color-info` | لون حد الضربة الخاص بالمعلومات. |
| `.-border-color-primary` | لون حد الضربة القياسي (Base). |
| `.-border-color-success` | لون حد الضربة الخاص بالنجاح. |
| `.-border-color-warning` | لون حد الضربة الخاص بالتحذير. |
| `.-border-radius-circle` | نصف قطر دائري كامل (50%). |
| `.-border-radius-large` | نصف قطر زاوية كبير. |
| `.-border-radius-medium` | نصف قطر زاوية متوسط. |
| `.-border-radius-pill` | نصف قطر حبة كاملة (Pill). |
| `.-border-radius-small` | نصف قطر زاوية صغير. |
| `.-border-width-large` | حد سميك صلب كبير بلون حد الضربة القياسي. |
| `.-border-width-medium` | حد متوسط صلب بلون حد الضربة القياسي. |
| `.-border-width-small` | حد صغير صلب بلون حد الضربة القياسي. |
| `.-cursor-auto` | المؤشر: auto. |
| `.-cursor-default` | المؤشر: default. |
| `.-cursor-grab` | المؤشر: grab. |
| `.-cursor-move` | المؤشر: move. |
| `.-cursor-not-allowed` | المؤشر: not-allowed. |
| `.-cursor-pointer` | المؤشر: pointer. |
| `.-cursor-text` | المؤشر: text. |
| `.-cursor-wait` | المؤشر: wait. |
| `.-display-block` | العرض: block. |
| `.-display-flex` | العرض: flex. |
| `.-display-inline` | العرض: inline. |
| `.-display-inline-block` | العرض: inline-block. |
| `.-display-inline-flex` | العرض: inline-flex. |
| `.-display-none` | العرض: none. |
| `.-overflow-x-auto` | الانسياب-أفقي: auto. |
| `.-overflow-x-clip` | الانسياب-أفقي: clip. |
| `.-overflow-x-hidden` | الانسياب-أفقي: hidden. |
| `.-overflow-x-scroll` | الانسياب-أفقي: scroll. |
| `.-overflow-x-visible` | الانسياب-أفقي: visible. |
| `.-overflow-y-auto` | الانسياب-عمودي: auto. |
| `.-overflow-y-clip` | الانسياب-عمودي: clip. |
| `.-overflow-y-hidden` | الانسياب-عمودي: hidden. |
| `.-overflow-y-scroll` | الانسياب-عمودي: scroll. |
| `.-overflow-y-visible` | الانسياب-عمودي: visible. |
| `.-position-absolute` | الموضع: absolute. |
| `.-position-fixed` | الموضع: fixed. |
| `.-position-relative` | الموضع: relative. |
| `.-position-static` | الموضع: static. |
| `.-position-sticky` | الموضع: sticky. |
| `.-shadow-above` | ظل ارتفاع مرتفع (Above elevation). |
| `.-shadow-resting` | ظل ارتفاع استراحي (Resting elevation). |
| `.-shadow-topmost` | ظل ارتفاع علوي (Topmost elevation). |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-border-radius-full` | `<length>` | `999rem` |
| `--instui-border-radius-lg` | `<length>` | `0.75rem` |
| `--instui-border-radius-md` | `<length>` | `0.5rem` |
| `--instui-border-radius-sm` | `<length>` | `0.25rem` |
| `--instui-border-width-lg` | `<length>` | `0.25rem` |
| `--instui-border-width-md` | `<length>` | `0.125rem` |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-color-stroke-brand` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-stroke-error` | `<color>` | `#E62429` |
| `--instui-color-stroke-info` | `<color>` | `#2B7ABC` |
| `--instui-color-stroke-success` | `<color>` | `#03893D` |
| `--instui-color-stroke-warning` | `<color>` | `#CF4A00` |
| `--instui-component-view-background-alert` | `<color>` | `#2B7ABC` |
| `--instui-component-view-background-brand` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-view-background-danger` | `<color>` | `#E62429` |
| `--instui-component-view-background-info` | `<color>` | `#2B7ABC` |
| `--instui-component-view-background-primary` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-view-background-primary-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-view-background-secondary` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-component-view-background-success` | `<color>` | `#03893D` |
| `--instui-component-view-background-warning` | `<color>` | `#CF4A00` |
| `--instui-elevation-above` | `none \| <shadow>#` | — |
| `--instui-elevation-resting` | `none \| <shadow>#` | — |
| `--instui-elevation-topmost` | `none \| <shadow>#` | — |


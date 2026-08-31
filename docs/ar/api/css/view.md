# CSS: view

`.instui-view` — البدائي للعرض: صندوق محايد مع معدّلات مفتاح-قيمة للخلفية والحد والنصف قطر والظل والعرض والموضع والفائض والمؤشر. كل واحد من هذه المعدّلات متاح أيضًا عالميًا (مفرد أو مرتبط بأي مكون آخر) — انظر إلى `background`/`border`/`shadow`/`display`/`position`/`overflow`/`cursor` utilities.

**المصدر:** [view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/view/view.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/view.css";
```

## Examples

```html
<div class="instui-view -background-secondary -border-radius-medium -shadow-resting">
  A card-like surface.
</div>
```

## Modifiers

| Modifier                       | Description                       |
| ------------------------------ | --------------------------------- |
| `.-background-alert`           | خلفية سطح التنبيه.                |
| `.-background-brand`           | خلفية سطح العلامة التجارية.       |
| `.-background-danger`          | خلفية سطح الخطر.                  |
| `.-background-info`            | خلفية سطح المعلومات.              |
| `.-background-primary`         | خلفية السطح الأساسي.              |
| `.-background-primary-inverse` | خلفية السطح الأساسي العكسي.       |
| `.-background-secondary`       | خلفية السطح الثانوي.              |
| `.-background-success`         | خلفية سطح النجاح.                 |
| `.-background-transparent`     | خلفية شفافة.                      |
| `.-background-warning`         | خلفية سطح التحذير.                |
| `.-border-color-brand`         | لون حدود ضربة العلامة التجارية.   |
| `.-border-color-danger`        | لون حدود ضربة الخطأ.              |
| `.-border-color-info`          | لون حدود ضربة المعلومات.          |
| `.-border-color-primary`       | لون حدود ضربة القاعدة.            |
| `.-border-color-success`       | لون حدود ضربة النجاح.             |
| `.-border-color-warning`       | لون حدود ضربة التحذير.            |
| `.-border-radius-circle`       | نصف قطر دائري كامل (50%).         |
| `.-border-radius-large`        | نصف قطر الزاوية الكبيرة.          |
| `.-border-radius-medium`       | نصف قطر الزاوية المتوسطة.         |
| `.-border-radius-pill`         | نصف قطر الحبة (الكامل).           |
| `.-border-radius-small`        | نصف قطر الزاوية الصغيرة.          |
| `.-border-width-large`         | حد صلب كبير في لون ضربة القاعدة.  |
| `.-border-width-medium`        | حد صلب متوسط في لون ضربة القاعدة. |
| `.-border-width-small`         | حد صلب صغير في لون ضربة القاعدة.  |
| `.-cursor-auto`                | cursor: auto.                     |
| `.-cursor-default`             | cursor: default.                  |
| `.-cursor-grab`                | cursor: grab.                     |
| `.-cursor-move`                | cursor: move.                     |
| `.-cursor-not-allowed`         | cursor: not-allowed.              |
| `.-cursor-pointer`             | cursor: pointer.                  |
| `.-cursor-text`                | cursor: text.                     |
| `.-cursor-wait`                | cursor: wait.                     |
| `.-display-block`              | display: block.                   |
| `.-display-flex`               | display: flex.                    |
| `.-display-inline`             | display: inline.                  |
| `.-display-inline-block`       | display: inline-block.            |
| `.-display-inline-flex`        | display: inline-flex.             |
| `.-display-none`               | display: none.                    |
| `.-overflow-x-auto`            | overflow-x: auto.                 |
| `.-overflow-x-clip`            | overflow-x: clip.                 |
| `.-overflow-x-hidden`          | overflow-x: hidden.               |
| `.-overflow-x-scroll`          | overflow-x: scroll.               |
| `.-overflow-x-visible`         | overflow-x: visible.              |
| `.-overflow-y-auto`            | overflow-y: auto.                 |
| `.-overflow-y-clip`            | overflow-y: clip.                 |
| `.-overflow-y-hidden`          | overflow-y: hidden.               |
| `.-overflow-y-scroll`          | overflow-y: scroll.               |
| `.-overflow-y-visible`         | overflow-y: visible.              |
| `.-position-absolute`          | الموضع: مطلق.                     |
| `.-position-fixed`             | الموضع: ثابت.                     |
| `.-position-relative`          | الموضع: نسبي.                     |
| `.-position-static`            | الموضع: ثابت.                     |
| `.-position-sticky`            | الموضع: لزج.                      |
| `.-shadow-above`               | ظل الارتفاع فوق.                  |
| `.-shadow-resting`             | ظل الارتفاع الراحة.               |
| `.-shadow-topmost`             | ظل الارتفاع الأعلى.               |

## Tokens consumed

| Token                                                | Type                | Value                          |
| ---------------------------------------------------- | ------------------- | ------------------------------ |
| `--instui-border-radius-full`                        | `<length>`          | `999rem`                       |
| `--instui-border-radius-lg`                          | `<length>`          | `0.75rem`                      |
| `--instui-border-radius-md`                          | `<length>`          | `0.5rem`                       |
| `--instui-border-radius-sm`                          | `<length>`          | `0.25rem`                      |
| `--instui-border-width-lg`                           | `<length>`          | `0.25rem`                      |
| `--instui-border-width-md`                           | `<length>`          | `0.125rem`                     |
| `--instui-border-width-sm`                           | `<length>`          | `0.0625rem`                    |
| `--instui-color-stroke-base`                         | `<color>`           | `light-dark(#8D959F, #6A7883)` |
| `--instui-color-stroke-brand`                        | `<color>`           | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-stroke-error`                        | `<color>`           | `#E62429`                      |
| `--instui-color-stroke-info`                         | `<color>`           | `#2B7ABC`                      |
| `--instui-color-stroke-success`                      | `<color>`           | `#03893D`                      |
| `--instui-color-stroke-warning`                      | `<color>`           | `#CF4A00`                      |
| `--instui-component-view-background-alert`           | `<color>`           | `#2B7ABC`                      |
| `--instui-component-view-background-brand`           | `<color>`           | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-view-background-danger`          | `<color>`           | `#E62429`                      |
| `--instui-component-view-background-info`            | `<color>`           | `#2B7ABC`                      |
| `--instui-component-view-background-primary`         | `<color>`           | `light-dark(#ffffff, #171B21)` |
| `--instui-component-view-background-primary-inverse` | `<color>`           | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-view-background-secondary`       | `<color>`           | `light-dark(#F2F4F5, #273540)` |
| `--instui-component-view-background-success`         | `<color>`           | `#03893D`                      |
| `--instui-component-view-background-warning`         | `<color>`           | `#CF4A00`                      |
| `--instui-elevation-above`                           | `none \| <shadow>#` | —                              |
| `--instui-elevation-resting`                         | `none \| <shadow>#` | —                              |
| `--instui-elevation-topmost`                         | `none \| <shadow>#` | —                              |

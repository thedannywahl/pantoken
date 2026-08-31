# CSS: spinner

`.instui-spinner` — حلقة تحميل متحركة؛ أعطها role="status" و aria-label.

`-color-inverse` فقط يعيد رسم قطاع الحد الأعلى المتحرك، وليس المسار بالكامل، لذا فإنه لا يزال يقرأ بشكل صحيح على بطاقة مظلمة بدون الحاجة إلى لون مسار منفصل.

**المصدر:** [spinner.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/spinner/spinner.css)

## Accessibility

أعط المغزل role="status" و aria-label حتى تعلن قارئات الشاشة عنها كحالة تحميل مباشرة.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/spinner.css";
```

## Demo

```demo
self:spinner
```

## Examples

```html
<span class="instui-spinner" role="status" aria-label="Loading"></span>
```

### Inverse color -nocard

```html
<div class="instui-view instui-card -background-primary-inverse">
  <span class="instui-spinner -color-inverse" role="status" aria-label="Loading"></span>
</div>
```

## Modifiers

| Modifier          | Description                                     |
| ----------------- | ----------------------------------------------- |
| `.-color-inverse` | على سطح مظلم.                                   |
| `.-size-large`    | كبير. اسم مستعار طويل الشكل لـ `-size-lg`.      |
| `.-size-lg`       | كبير.                                           |
| `.-size-sm`       | صغير.                                           |
| `.-size-small`    | صغير. اسم مستعار طويل الشكل لـ `-size-sm`.      |
| `.-size-x-small`  | صغير جداً. الاسم المستعار الطويل لـ `-size-xs`. |
| `.-size-xs`       | صغير جداً.                                      |

## Animations

| Animation                 | Description |
| ------------------------- | ----------- |
| `pantoken-spinner-rotate` | —           |

## Tokens consumed

| Token                                        | Type       | Value                                                    |
| -------------------------------------------- | ---------- | -------------------------------------------------------- |
| `--instui-component-spinner-color`           | `<color>`  | `light-dark(#2871AF, #7FB4F1)`                           |
| `--instui-component-spinner-inverse-color`   | `<color>`  | `#ffffff`                                                |
| `--instui-component-spinner-spinner-size-lg` | `<length>` | `4.5rem`                                                 |
| `--instui-component-spinner-spinner-size-md` | `<length>` | `3.5rem`                                                 |
| `--instui-component-spinner-spinner-size-sm` | `<length>` | `2rem`                                                   |
| `--instui-component-spinner-spinner-size-xs` | `<length>` | `1rem`                                                   |
| `--instui-component-spinner-stroke-width-lg` | `<length>` | `0.75em`                                                 |
| `--instui-component-spinner-stroke-width-md` | `<length>` | `0.5em`                                                  |
| `--instui-component-spinner-stroke-width-sm` | `<length>` | `0.375em`                                                |
| `--instui-component-spinner-stroke-width-xs` | `<length>` | `0.25em`                                                 |
| `--instui-component-spinner-track-color`     | `<color>`  | `light-dark(rgba(35,68,101,0.1), rgba(255,255,255,0.1))` |

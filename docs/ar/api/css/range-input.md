# CSS: range-input

`.instui-range-input` — منزلق نطاق بنمط مع فقاعة قيمة معكوسة.

كل عناصر شبه من الإبهام/المسار من المورد تحتاج إلى قاعدة منفصلة خاصة بها — تجميعها في قائمة محدد واحدة سيلغي القاعدة بأكملها في المتصفحات التي لا تعترف بالعنصر الشبه للمورد الآخر.

**المصدر:** [range-input.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/range-input/range-input.css)

## Accessibility

عنصر التحكم هو `<input type="range">` أصلي؛ أعطه اسماً قابلاً للوصول مع `aria-label` أو `&lt;label&gt;` مرتبط.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/range-input.css";
```

## Examples

```html
<input class="instui-range-input" id="r1" type="range" value="30" />
```

## Modifiers

| Modifier       | Description                    |
| -------------- | ------------------------------ |
| `.-size-large` | اسم مستعار طويل لـ `-size-lg`. |
| `.-size-small` | اسم مستعار طويل لـ `-size-sm`. |

## Pseudo-elements

| Pseudo-element | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `::before`     | يرسم علامة إقحام فقاعة القيمة، مثلث صغير يشير للخلف نحو المسار. |

## Tokens consumed

| Token                                                       | Type                                               | Value                                                                        |
| ----------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-border-radius-md`                                 | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-border-width-sm`                                  | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-color-background-inverse`                         | `<color>`                                          | `light-dark(#334450, #F2F4F5)`                                               |
| `--instui-color-text-inverse`                               | `<color>`                                          | `light-dark(#ffffff, #1C222B)`                                               |
| `--instui-component-range-input-handle-background`          | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-range-input-handle-border-color`        | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-range-input-handle-border-size`         | `<length>`                                         | `0.125rem`                                                                   |
| `--instui-component-range-input-handle-focus-background`    | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-range-input-handle-focus-outline-color` | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-range-input-handle-focus-outline-width` | `<length>`                                         | `0.75em`                                                                     |
| `--instui-component-range-input-handle-hover-background`    | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-range-input-handle-shadow-color`        | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-range-input-handle-size`                | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-range-input-min-width`                  | `<length>`                                         | `12.5rem`                                                                    |
| `--instui-component-range-input-track-background`           | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-range-input-track-border-color`         | `<color>`                                          | `light-dark(#7E8792, #5F6E7A)`                                               |
| `--instui-component-range-input-value-font-family`          | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-range-input-value-font-weight`          | `<integer>`                                        | `400`                                                                        |
| `--instui-component-range-input-value-large-font-size`      | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-range-input-value-large-line-height`    | `<length>`                                         | `3rem`                                                                       |
| `--instui-component-range-input-value-large-padding`        | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-range-input-value-medium-font-size`     | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-range-input-value-medium-padding`       | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-range-input-value-small-font-size`      | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-range-input-value-small-line-height`    | `<length>`                                         | `1.75rem`                                                                    |
| `--instui-component-range-input-value-small-padding`        | `<length>`                                         | `0.5rem`                                                                     |

## Related

- [number-input](/ar/api/css/number-input.md) — نظير إدخال الأرقام المكتوب.

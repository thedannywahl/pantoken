# CSS: list.item

`.instui-list` — عنصر قائمة (InstUI `List.Item`).

معدِّلات `-size-sm`/`-size-lg`، `-ordered`، و`-delimiter-solid`/`-delimiter-dashed` للـ `list` الأب تعيد تصميم هذا العضو — انظر توثيق `list` الخاص به لتلك المعدِّلات.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/list.item.css";
```

## Modifiers

| Modifier             | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| `.-delimiter-dashed` | فصل العناصر بقاعدة متقطعة. @affects list.item — إضافة قاعدة الفاصل بين العناصر. |
| `.-delimiter-solid`  | فصل العناصر بقاعدة صلبة. @affects list.item — إضافة قاعدة الفاصل بين العناصر.   |
| `.-ordered`          | ترقيم القائمة المرتبة. @affects list.item — إضافة وزن العلامة والمحاذاة.        |
| `.-size-large`       | اسم مستعار طويل لـ `-size-lg`.                                                  |
| `.-size-medium`      | اسم مستعار طويل لـ `-size-md`.                                                  |
| `.-size-small`       | اسم مستعار طويل لـ `-size-sm`.                                                  |

## Pseudo-elements

| Pseudo-element | Description                               |
| -------------- | ----------------------------------------- |
| `::marker`     | يرسم نقطة القائمة أو رقم القائمة المرتبة. |

## Tokens consumed

| Token                                                        | Type                                               | Value                                                                        |
| ------------------------------------------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-list-item-color`                         | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-list-item-delimiter-dashed-border-color` | `<color>`                                          | `light-dark(#E8EAEC, #2D3D49)`                                               |
| `--instui-component-list-item-delimiter-dashed-border-style` | —                                                  | `dashed`                                                                     |
| `--instui-component-list-item-delimiter-dashed-border-width` | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-list-item-delimiter-solid-border-color`  | `<color>`                                          | `light-dark(#E8EAEC, #2D3D49)`                                               |
| `--instui-component-list-item-delimiter-solid-border-style`  | —                                                  | `solid`                                                                      |
| `--instui-component-list-item-delimiter-solid-border-width`  | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-list-item-font-family`                   | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-list-item-font-size-large`               | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-list-item-font-size-medium`              | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-list-item-font-size-small`               | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-list-item-font-weight`                   | `<integer>`                                        | `400`                                                                        |
| `--instui-component-list-item-line-height`                   | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-list-item-spacing-medium`                | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-list-ordered-number-font-weight`         | `<integer>`                                        | `600`                                                                        |
| `--instui-component-list-ordered-number-margin`              | `<length>`                                         | `0.5rem`                                                                     |

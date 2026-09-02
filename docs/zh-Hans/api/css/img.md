# CSS: img

`.instui-img` — A styled `&lt;img&gt;` with display, crop, and effect modifiers that stack.

Effects compose through the shared `--pantoken-img-filter` custom property, so `-with-grayscale` and `-with-blur` can apply together; the `-constrain-*` crop modifiers require the consumer to size the box explicitly.

**Source:** [img.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/img/img.css)

## 无障碍

Provide meaningful `alt` text that describes the image, and use an empty `alt=""` for purely decorative images so assistive tech skips them.

## 用法

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/img.css";
```

## 示例

```html
<img class="instui-img" alt="Gradient">
```

## 修饰符

| 修饰符 | 描述 |
| --- | --- |
| `.-constrain-contain` | Scale to fit within the box (contain). |
| `.-constrain-cover` | Scale to fill the box (cover). |
| `.-display-block` | Display as a block element. |
| `.-with-blur` | Apply a blur effect. |
| `.-with-grayscale` | Apply a grayscale effect. |

## 自定义属性

| 属性 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| `--pantoken-img` | — | — | filter &lt;filter-value-list&gt; \| none — The composed CSS filter on the image; the effect modifiers set it, and you can override it for a custom filter. |

## 消耗代币

| 代币 | 类型 | 值 |
| --- | --- | --- |
| `--instui-component-img-effect-transition-duration` | `<time>` | `1s` |
| `--instui-component-img-image-blur-amount` | `<length>` | `0.25em` |
| `--pantoken-img-filter` | `none \| <filter-value-list> \| <-ms-filter-function-list>` | `none` |


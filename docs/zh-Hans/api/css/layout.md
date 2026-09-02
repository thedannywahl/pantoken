# CSS: layout

`.--display-flex` — Display and text-align utilities — `.--display-&lt;value&gt;` and `.--text-align-&lt;value&gt;` — as composable, global classes, usable bare or chained onto any component.

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/layout/index.ts)

## 用法

```css
@import "@pantoken/components/utilities.css";
```

## 示例

```html
<div class="--display-flex --text-align-center">
  <span>One</span>
  <span>Two</span>
</div>
```

## 修饰符

| 修饰符 | 描述 |
| --- | --- |
| `.--display-flex` | Sets `display: flex`. |
| `.--display-*` | Display utilities: `block`, `inline-block`, `inline`, `flex`, `inline-flex`, and `none`. |
| `.--text-align-*` | Text-alignment utilities: `start`, `center`, `end`, and `justify`. |


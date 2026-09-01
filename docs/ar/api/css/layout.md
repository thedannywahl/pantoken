# CSS: layout

`.--display-flex` — أدوات العرض ومحاذاة النص — `.--display-&lt;value&gt;` و `.--text-align-&lt;value&gt;` — كفئات عالمية قابلة للتركيب، قابلة للاستخدام بمفردها أو متسلسلة على أي مكوّن.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/layout/index.ts)

## الاستخدام

```css
@import "@pantoken/components/utilities.css";
```

## أمثلة

```html
<div class="--display-flex --text-align-center">
  <span>One</span>
  <span>Two</span>
</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.--display-flex` | يضبط `display: flex`. |
| `.--display-*` | أدوات العرض: `block`, `inline-block`, `inline`, `flex`, `inline-flex`، و `none`. |
| `.--text-align-*` | أدوات محاذاة النص: `start`, `center`, `end`، و `justify`. |


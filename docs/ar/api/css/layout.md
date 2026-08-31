# CSS: layout

`.--display-flex` — أدوات العرض ومحاذاة النص — `.--display-&lt;value&gt;` و `.--text-align-&lt;value&gt;` — كفئات قابلة للتكوين عالمية، قابلة للاستخدام بشكل فردي أو مرتبطة بأي مكون.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/layout/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--display-flex --text-align-center">
  <span>One</span>
  <span>Two</span>
</div>
```

## Modifiers

| Modifier          | Description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| `.--display-flex` | يعيّن `display: flex`.                                                           |
| `.--display-*`    | أدوات العرض: `block`، `inline-block`، `inline`، `flex`، `inline-flex`، و `none`. |
| `.--text-align-*` | أدوات محاذاة النص: `start`، `center`، `end`، و `justify`.                        |

# CSS: position

`.--position-relative` — `position` كفئة قابلة للتكوين وعامة — `.--position-&lt;value&gt;` — قابلة للاستخدام بشكل عاري أو متسلسلة على أي مكون (`.instui-button.--position-relative`).

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/position/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--position-relative">…</div>
```

## Modifiers

| Modifier               | Description   |
| ---------------------- | ------------- |
| `.--position-absolute` | الموضع: مطلق. |
| `.--position-fixed`    | الموضع: ثابت. |
| `.--position-relative` | الموضع: نسبي. |
| `.--position-static`   | الموضع: ثابت. |
| `.--position-sticky`   | الموضع: لزج.  |

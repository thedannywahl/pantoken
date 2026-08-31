# CSS: maskglobal

`.--mask-overlay` — نسخة عالمية مزدوجة من معدّلات الطبقة العلوية للمكون `mask` — `--mask-overlay`، `--mask-fullscreen`، `--mask-blur` — قابلة للاستخدام عارية أو متسلسلة على أي مكون، بدون الالتفاف في عنصر `.instui-mask`.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/mask/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<button class="instui-button --mask-overlay">…</button>
```

## Modifiers

| Modifier             | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `.--mask-blur`       | طمّس ما يقع خلف القناع باستخدام backdrop-filter.        |
| `.--mask-fullscreen` | ثابت على الإطار المرئي، يغطيه برقم z-index عالي.        |
| `.--mask-overlay`    | طبقة القناع العلوية الكاملة (الموضع، التوسيط، الخلفية). |

## Tokens consumed

| Token                                      | Type      | Value                                                     |
| ------------------------------------------ | --------- | --------------------------------------------------------- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |

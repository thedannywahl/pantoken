[pantoken](../../../../index.md) / colors

# colors

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-colors` — حساب ألوان CSS فقط الذي يعكس مساعدات InstUI `@instructure/ui-color-utils` (`alpha`، `darken`، `lighten`، `overlayColors`).

تحسب InstUI تلك القيم وقت البناء باستخدام `tinycolor2` مقابل قيم سادسة عشرية محددة. يصدر pantoken
مراجع `var(--instui-*)` التي تتحلل في المتصفح (غالبًا من خلال `light-dark()`)، لذلك يجب
أن تحدث العملية الحسابية في CSS بدلاً من ذلك. تُرجع كل دالة مساعدة سلسلة ألوان CSS مبنية من
[`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix) و
[بناء جملة اللون النسبي](https://developer.mozilla.org/docs/Web/CSS/CSS_colors/Relative_colors) —
كلاهما ميزات متصفح حديث أساسي — لذا يتتبع تعبير واحد الرمز حتى عندما يكون زوج
`light-dark()` يعتمد على المخطط. استخدمها في أي مكان كان يجب عليك وضع رمز سداسي عشري مشتق بخلاف ذلك.

## Example

```ts
import { alpha, darken } from "@pantoken/plugin-colors";

// A subtle brand-tinted hover, derived from the brand token (mirrors InstUI's ghost hover).
const hover = alpha(darken("var(--instui-color-institutional-brand-button-primary-bgd)", 10), 10);
// → "color-mix(in srgb, hsl(from var(--…brand-…) h s calc(l - 10)) 10%, transparent)"
```

## Type Aliases

- [CssColor](type-aliases/CssColor.md)

## Functions

- [alpha](functions/alpha.md)
- [darken](functions/darken.md)
- [lighten](functions/lighten.md)
- [overlayColors](functions/overlayColors.md)
- [onColor](functions/onColor.md)

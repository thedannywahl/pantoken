[pantoken](../../../../index.md) / colors

# colors

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-colors` — عمليات حسابية للألوان في CSS فقط تُحاكي مُساعدات InstUI `@instructure/ui-color-utils`
(`alpha`, `darken`, `lighten`, `overlayColors`).

يقوم InstUI بحساب هذه القيم وقت البناء باستخدام `tinycolor2` مقابل قيم هكس ثابتة. يصدر pantoken مراجع
`var(--instui-*)` التي تُحلّ في المتصفح (غالبًا عبر `light-dark()`), لذا يجب أن تتمّ
العمليات الحسابية في CSS بدلاً من ذلك. كل مُساعد يُعيد سلسلة لون CSS مبنية من
[`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix) و
[تركيب الألوان النسبي](https://developer.mozilla.org/docs/Web/CSS/CSS_colors/Relative_colors) —
هاتان ميزتان أساسيتان في المتصفحات الحديثة — لذا يتتبع تعبير واحد التوكين حتى عندما يكون زوج `light-dark()` معتمداً على المخطط. استخدمها في أي مكان كنت ستقوم فيه بخضوع مشتق مُشفّر يدوياً.

## مثال

```ts
import { alpha, darken } from "@pantoken/plugin-colors";

// A subtle brand-tinted hover, derived from the brand token (mirrors InstUI's ghost hover).
const hover = alpha(darken("var(--instui-color-institutional-brand-button-primary-bgd)", 10), 10);
// → "color-mix(in srgb, hsl(from var(--…brand-…) h s calc(l - 10)) 10%, transparent)"
```

## أسماء أنواع مستعارة

- [CssColor](type-aliases/CssColor.md)

## الدوال

- [alpha](functions/alpha.md)
- [darken](functions/darken.md)
- [lighten](functions/lighten.md)
- [overlayColors](functions/overlayColors.md)
- [onColor](functions/onColor.md)

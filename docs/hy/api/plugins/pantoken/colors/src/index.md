[pantoken](../../../../index.md) / colors

# colors

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/plugin-colors` — CSS միայն գույն մաթեմատիկա, որ հայտնի է InstUI `@instructure/ui-color-utils` օգնականներ (`alpha`, `darken`, `lighten`, `overlayColors`):

InstUI-ն հաշվարկում է դրանք կառուցման ժամանակ `tinycolor2`-ի հետ բետոնային hex արժեքների դեմ։ pantoken-ը արձակում է `var(--instui-*)` հղումներ, որոնք լուծվում են բրաուզերում (հաճախ `light-dark()`-ի միջոցով), ուստի մաթեմատիկան պետք է տեղի ունենա CSS-ում՝ փոխարենը։ Յուրաքանչյուր օգնական վերադարձնում է CSS գույնի տող, որը կառուցված է [`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix)-ից և [հարաբերական գույնի շարահյուսություն](https://developer.mozilla.org/docs/Web/CSS/CSS_colors/Relative_colors)-ից — երկուսն էլ Baseline ժամանակակից բրաուզերի հատկանիշներ են — ուստի մեկ արտահայտությունը հետևում է տոկենին, նույնիսկ երբ այն սխեմայից կախված `light-dark()` զույգ է։ Օգտագործեք դրանք գրեթե ամենուր, որտեղ դուք հակառակ դեպքում կարծրագրել կարողանաք ստացված ստվեր։

## Օրինակ

```ts
import { alpha, darken } from "@pantoken/plugin-colors";

// A subtle brand-tinted hover, derived from the brand token (mirrors InstUI's ghost hover).
const hover = alpha(darken("var(--instui-color-institutional-brand-button-primary-bgd)", 10), 10);
// → "color-mix(in srgb, hsl(from var(--…brand-…) h s calc(l - 10)) 10%, transparent)"
```

## Տիպային հոմանիշներ

- [CssColor](type-aliases/CssColor.md)

## Ֆունկցիաներ

- [alpha](functions/alpha.md)
- [darken](functions/darken.md)
- [lighten](functions/lighten.md)
- [overlayColors](functions/overlayColors.md)
- [onColor](functions/onColor.md)

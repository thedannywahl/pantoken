[pantoken](../../../index.md) / foundation

# foundation

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/foundation` — tema Foundation for Sites med Instructure tokens.

Foundation er Sass-først, så denne pakke leveres i to lag. [toFoundationSettings](functions/toFoundationSettings.md) udsender en
`_settings`-stil Sass-partial, der peger Foundations indstillings-variabler på `var(--instui-*)`, så
et Sass-byg kompilerer Instructure-udseendet, mens runtime-tematisering via de samme brugerdefinerede
egenskaber bevares. [toFoundationCss](functions/toFoundationCss.md) udsender et tyndt CSS-overlay, der tematiserer de almindelige kompilerede
klasser (`.button`, `.callout`, links) på samme måde — nyttigt når du forbruger stock Foundation CSS
og bare ønsker at lægge Instructure-farver ovenpå uden at omkompilere.

## Example

```ts
import { foundationSettings, foundationCss } from "@pantoken/foundation";
// foundationSettings → a Sass partial; foundationCss → a runtime overlay.
```

## Interfaces

- [ToFoundationSettingsOptions](interfaces/ToFoundationSettingsOptions.md)
- [ToFoundationCssOptions](interfaces/ToFoundationCssOptions.md)

## Variables

- [FOUNDATION\_TO\_INSTUI](variables/FOUNDATION_TO_INSTUI.md)
- [foundationSettings](variables/foundationSettings.md)
- [foundationCss](variables/foundationCss.md)

## Functions

- [toFoundationSettings](functions/toFoundationSettings.md)
- [toFoundationCss](functions/toFoundationCss.md)

## References

### default

Omdøber og gen-eksporterer [foundationCss](variables/foundationCss.md)

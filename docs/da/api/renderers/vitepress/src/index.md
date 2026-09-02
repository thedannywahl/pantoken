[pantoken](../../../index.md) / vitepress

# vitepress

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/vitepress` — tema et VitePress-websted med Instructure-tokens.

VitePress-temaer drives af `--vp-*` CSS-variabler. Dette peger dem på `var(--instui-*)`, så
at droppe outputtet ind i `.vitepress/theme/custom.css` (sammen med `@pantoken/css`, som definerer
de brugerdefinerede egenskaber) giver dokumenterne Instructure-udseende, mens lys/mørkt fortsætter med at flyde
igennem de samme tokens.

## Interfaces

- [ToVitePressCssOptions](interfaces/ToVitePressCssOptions.md)

## Variabler

- [VITEPRESS\_TO\_INSTUI](variables/VITEPRESS_TO_INSTUI.md)

[pantoken](../../../../index.md) / theme-custom-media

# theme-custom-media

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-theme-custom-media` — հեղինակ theme custom-idents-ով
(`@media (theme: &lt;name&gt;)`) և/կամ `@media (--theme-*)` անվանումներ, ապա արտանետել concrete CSS
ընտրված target theme-ի համար:

Plugin-ը ընդլայնում է հաշմանդամ `--theme-*` և `--breakpoint-*` անվանումներ, կրճատում non-target theme
ճյուղերը, հեռացնում համապատասխան `theme:*` կետերը պահպան հարցումներից, բացում միշտ-ճշմարիտ theme-միայն media
ծածկերը, և հեռացնում `@custom-media --theme-*`/`--breakpoint-*` հայտարարություններ արտանետել CSS-ից:

## Interfaces

- [ThemeCustomMediaOptions](interfaces/ThemeCustomMediaOptions.md)

## Type Aliases

- [Theme](type-aliases/Theme.md)

## Variables

- [themeCustomMedia](variables/themeCustomMedia.md)

## References

### default

Վերանվանել և վերա-արտահանել [themeCustomMedia](variables/themeCustomMedia.md)

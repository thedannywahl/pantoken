[pantoken](../../../../index.md) / custom-icons

# custom-icons

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-custom-icons` — leverandørskulde brugerdefinerede ikonglyfter til downstream-forbrugere.

Henter ikoner, der ikke er en del af InstUI-sættet (produkt/brand-mærker osv.) som
`--instui-icon-&lt;name&gt;` billedtokener — det samme navnerum og `.-icon-&lt;name&gt;` maler-klasse, som
de indbyggede InstUI-ikoner bruger, så et brugerdefineret ikon falder ind i `.instui-icon -icon-&lt;name&gt;` nøjagtigt som et
bygget ikon. Uden `custom-` præfiks: ved navnesammenstød skal det indbyggede InstUI-ikon vinde (indlæs
det efter dette plugins CSS i enhver kombinerings-URL).

## Eksempel

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customIcons } from "@pantoken/plugin-custom-icons";

const css = toCss(byTheme("rebrand"), { plugins: [customIcons({ names: ["highspot"] })] });
// adds --instui-icon-highspot as an <image> token
```

## Interfaces

- [CustomIcon](interfaces/CustomIcon.md)
- [CustomIconsOptions](interfaces/CustomIconsOptions.md)

## Variabler

- [icons](variables/icons.md)

## Funktioner

- [customIcons](functions/customIcons.md)

## Referencer

### default

Omdøber og re-eksporterer [customIcons](functions/customIcons.md)

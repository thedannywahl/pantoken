[pantoken](../../../../index.md) / custom-icons

# custom-icons

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-custom-icons` — glifos d'icones personalitzades de tercers per a consumidors de flux descendent.

Introdueix icones que no són part del conjunt InstUI (marques de producte/marca, etc.) com a
`--instui-icon-&lt;name&gt;` tokens d'imatge — el mateix espai de noms i classe de pintor `.-icon-&lt;name&gt;`
que utilitzen les icones InstUI integrades, de manera que una icona personalitzada es cau a `.instui-icon -icon-&lt;name&gt;` exactament com una
integrada. Sense prefix `custom-`: en cas de col·lisió de noms, la icona InstUI integrada hauria de guanyar (carregueu-la
despré del CSS d'aquest connector en qualsevol URL de combinació).

## Exemple

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customIcons } from "@pantoken/plugin-custom-icons";

const css = toCss(byTheme("rebrand"), { plugins: [customIcons({ names: ["highspot"] })] });
// adds --instui-icon-highspot as an <image> token
```

## Interfícies

- [CustomIcon](interfaces/CustomIcon.md)
- [CustomIconsOptions](interfaces/CustomIconsOptions.md)

## Variables

- [icons](variables/icons.md)

## Funcions

- [customIcons](functions/customIcons.md)

## Referències

### default

Reanomena i reexporta [customIcons](functions/customIcons.md)

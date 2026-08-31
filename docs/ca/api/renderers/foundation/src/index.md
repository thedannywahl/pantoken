[pantoken](../../../index.md) / foundation

# foundation

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/foundation` — tema Foundation for Sites amb tokens d'Instructure.

Foundation és primer en Sass, per tant aquest paquet té dues capes. [toFoundationSettings](functions/toFoundationSettings.md) emet una
particella Sass d'estil `_settings` que dirigeix les variables de configuració de Foundation a `var(--instui-*)`, per tant
una compilació Sass compila el look d'Instructure mantenint la temàtica en temps d'execució a través de les mateixes propietats personalitzades.
[toFoundationCss](functions/toFoundationCss.md) emet una superposició CSS fina que temàtitza les classes comunes compilades
(`.button`, `.callout`, enllaços) de la mateixa manera — útil quan consums CSS de Foundation estàndard
i només vols superposar colors d'Instructure al damunt sense recompilar.

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

Canvia el nom i re-exporta [foundationCss](variables/foundationCss.md)

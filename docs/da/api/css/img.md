# CSS: img

`.instui-img` — En stiliseret `&lt;img&gt;` med display-, beskæringer- og effektmodifikatorer, der stables.

Effekter sammensætter sig gennem den delte `--pantoken-img-filter` brugerdefineret egenskab, så `-with-grayscale` og `-with-blur` kan anvendes sammen; `-constrain-*` beskæringsmodifikatorer kræver, at forbrugeren eksplicit angiver boksens størrelse.

**Kilde:** [img.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/img/img.css)

## Tilgængelighed

Giv meningsfuld `alt` tekst, der beskriver billedet, og brug en tom `alt=""` til rent dekorative billeder, så assistivteknologi springer dem over.

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/img.css";
```

## Eksempler

```html
<img class="instui-img" alt="Gradient">
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-constrain-contain` | Skaler for at passe inden i boksen (contain). |
| `.-constrain-cover` | Skaler for at fylde boksen (cover). |
| `.-display-block` | Vis som blokelement. |
| `.-with-blur` | Anvend en sløringeffekt. |
| `.-with-grayscale` | Anvend en gråtonerseffekt. |

## Brugerdefinerede egenskaber

| Egenskab | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `--pantoken-img` | — | — | filter &lt;filter-value-list&gt; \| none — Det sammensatte CSS-filter på billedet; effektmodifikatorerne angiver det, og du kan tilsidesætte det for et brugerdefineret filter. |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-component-img-effect-transition-duration` | `<time>` | `1s` |
| `--instui-component-img-image-blur-amount` | `<length>` | `0.25em` |
| `--pantoken-img-filter` | `none \| <filter-value-list> \| <-ms-filter-function-list>` | `none` |


# CSS: maskglobal

`.--mask-overlay` — Una còpia global, dual dels modificadors de superposició del component `mask` — `--mask-overlay`, `--mask-fullscreen`, `--mask-blur` — usables senzill o encadenats a qualsevol component, sense embolcallar en un element `.instui-mask`.

**Font:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/mask/index.ts)

## Ús

```css
@import "@pantoken/components/utilities.css";
```

## Exemples

```html
<button class="instui-button --mask-overlay">…</button>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.--mask-blur` | Desenfoqui el que hi ha darrere la màscara amb un backdrop-filter. |
| `.--mask-fullscreen` | Fixat a la finestra gràfica, cobrint-la a un z-index alt. |
| `.--mask-overlay` | La superposició de màscara completa (posició, centrat, fons). |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |


# CSS: stacking

`.--stack-topmost` — Utilitats de profunditat z-index — `.--stack-&lt;level&gt;` (`deepest`, `below`, `above`, `topmost`) — usables pur o encadenat a qualsevol component, per que les capes s'apilen de manera predictable en lloc de per nombres ajustats manualment.

**Font:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/stacking/index.ts)

## Ús

```css
@import "@pantoken/components/utilities.css";
```

## Exemples

```html
<div class="--stack-topmost">Always on top.</div>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.--stack-above` | Per sobre del flux per defecte. |
| `.--stack-below` | Per sota del flux per defecte. |
| `.--stack-deepest` | La profunditat d'apilament més baixa. |
| `.--stack-topmost` | La profunditat d'apilament més alta (superposicions, menús). |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-view-stacking-above` | `<integer>` | `1` |
| `--instui-component-view-stacking-below` | `<integer>` | `-1` |
| `--instui-component-view-stacking-deepest` | `<integer>` | `-9999` |
| `--instui-component-view-stacking-topmost` | `<integer>` | `9999` |


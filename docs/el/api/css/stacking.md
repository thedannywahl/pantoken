# CSS: stacking

`.--stack-topmost` — z-index depth utilities — `.--stack-&lt;level&gt;` (`deepest`, `below`, `above`, `topmost`) — usable bare or chained onto any component, so layers stack predictably instead of by hand-tuned numbers.

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/stacking/index.ts)

## Χρήση

```css
@import "@pantoken/components/utilities.css";
```

## Παραδείγματα

```html
<div class="--stack-topmost">Always on top.</div>
```

## Τροποποιητές

| Τροποποιητής | Περιγραφή |
| --- | --- |
| `.--stack-above` | Above the default flow. |
| `.--stack-below` | Below the default flow. |
| `.--stack-deepest` | The lowest stacking depth. |
| `.--stack-topmost` | The highest stacking depth (overlays, menus). |

## Καταναλωμένα tokens

| Token | Τύπος | Τιμή |
| --- | --- | --- |
| `--instui-component-view-stacking-above` | `<integer>` | `1` |
| `--instui-component-view-stacking-below` | `<integer>` | `-1` |
| `--instui-component-view-stacking-deepest` | `<integer>` | `-9999` |
| `--instui-component-view-stacking-topmost` | `<integer>` | `9999` |


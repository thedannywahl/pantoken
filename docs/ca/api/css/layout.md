# CSS: layout

`.--display-flex` — Utilitats de pantalla i alineació de text — `.--display-&lt;value&gt;` i `.--text-align-&lt;value&gt;` — com a classes globals composables, usables sol o encadenats a qualsevol component.

**Font:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/layout/index.ts)

## Ús

```css
@import "@pantoken/components/utilities.css";
```

## Exemples

```html
<div class="--display-flex --text-align-center">
  <span>One</span>
  <span>Two</span>
</div>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.--display-flex` | Estableix `display: flex`. |
| `.--display-*` | Utilitats de pantalla: `block`, `inline-block`, `inline`, `flex`, `inline-flex`, i `none`. |
| `.--text-align-*` | Utilitats d'alineació de text: `start`, `center`, `end`, i `justify`. |


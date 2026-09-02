# CSS: close-button

`.instui-close-button` — Un botó d'icona transparent que dibuixa el seu propi glif ×, en tres mides més una variant inversa.

Sempre es renderitza com a control només amb icona sense etiqueta visible, per la qual cosa és necessari un `aria-label`, no opcional; compareu amb la variant fantasma `-without-background` de `button`, que conserva una etiqueta de text.

**Font:** [close-button.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/close-button/close-button.css)

<!-- js-requirement -->
> [!TIP]
> **Millora JS** — El CSS d'aquest component es representa i funciona per si sol; emparella'l amb `@pantoken/interactions` per afegir el comportament interactiu. Mira la [taula de modificadors a continuació](#modifiers).


## Accessibilitat

Doneu al botó només amb icona un `aria-label` (per exemple "Tancar").

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/close-button.css";
```

## Exemples

```html
<button class="instui-close-button -size-sm" aria-label="Close"></button>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-color-inverse` | Per a fons foscos. |
| `.-size-large` | Gran. Àlias de forma llarga de `-size-lg`. |
| `.-size-lg` | Gran. |
| `.-size-sm` | Petit. |
| `.-size-small` | Petit. Àlias de forma llarga de `-size-sm`. |

## Pseudoelements

| Pseudoelement | Descripció |
| --- | --- |
| `::before` | El glif ×, enmascarats a `currentColor`. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-color-background-interactive-action-tertiary-active` | `<color>` | `light-dark(#E2EAF7, #234465)` |
| `--instui-color-background-interactive-action-tertiary-hover` | `<color>` | `light-dark(#EEF4FD, #2E5177)` |
| `--instui-color-text-interactive-action-secondary-base` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-component-base-button-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-base-button-large-height` | `<length>` | `3rem` |
| `--instui-component-base-button-medium-height` | `<length>` | `2.5rem` |
| `--instui-component-base-button-primary-inverse-ghost-color` | `<color>` | `#ffffff` |
| `--instui-component-base-button-small-height` | `<length>` | `2rem` |
| `--instui-icon-x` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## Relacionat

- [button](/ca/api/css/button.md) — El botó d'acció de propòsit general.


# CSS: context-view

`.instui-context-view` — En forhøjet opfordring med en caret, positionerbar på enhver side; fungerer som en naturlig `[popover]`.

Careten er to stablet `::before`/`::after` trekanter (kant derefter fyld) så den læses korrekt mod en matchende overflade; som en `[popover]` skal den have samme åben/`popovertarget` ledning som `popover`, men i modsætning til `tooltip` afviser den ved klik uden for eller Escape.

**Kilde:** [context-view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/context-view/context-view.css)

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/context-view.css";
```

## Eksempler

```html
<div class="instui-context-view -placement-bottom" id="cv-popover">A context view frames a callout with a caret. As a popover it rides the top layer and closes when you click away or press Esc.</div>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-color-inverse` | Mørkt (invert) farveskema. |
| `.-placement-bottom` | Sid under ankeret. |
| `.-placement-end` | Sid ved slutningen (inline-end) af ankeret. |
| `.-placement-start` | Sid ved starten (inline-start) af ankeret. |
| `.-placement-top` | Sid over ankeret. |

## Pseudo-elementer

| Pseudo-element | Beskrivelse |
| --- | --- |
| `::after` | Gengiver caretens indre fyldtrekant. |
| `::before` | Gengiver caretens ydre kanttrekant. |

## Tilstande

| Tilstand | Beskrivelse |
| --- | --- |
| `:state(open)` | — |

## Betingelser

| Type | Forespørgsel | Beskrivelse |
| --- | --- | --- |
| supports | `(position-area: block-end)` | — |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-color-background-elevated-surface-base` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-color-background-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-color-text-inverse` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-context-view-arrow-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-context-view-arrow-background-color-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-context-view-arrow-border-color` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-context-view-arrow-border-color-inverse` | `<color>` | `#00000000` |
| `--instui-component-context-view-arrow-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-context-view-arrow-size` | `<length>` | `0.5rem` |
| `--instui-component-context-view-border-radius` | `<length>` | `0.75rem` |
| `--instui-elevation-above` | `none \| <shadow>#` | — |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |

## Browserunderstøttelse

- Bruger CSS-ankerpositionering (`position-anchor`, `position-area`, `position-try-fallbacks`) og det native `[popover]` API bag en `@supports` vagt; har brug for en nylig Chromium eller Safari og falder tilbage til et UA-centreret popover andre steder.

## Relateret

- [popover](/da/api/css/popover.md) — Det generiske toplag popover.
- [tooltip](/da/api/css/tooltip.md) — En mindre hover eller fokusopfordring.


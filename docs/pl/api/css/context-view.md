# CSS: context-view

`.instui-context-view` — An elevated callout with a caret, positionable on any side; works as a native `[popover]`.

The caret is two stacked `::before`/`::after` triangles (border then fill) so it reads correctly against a matching surface; as a `[popover]` it needs the same open/`popovertarget` wiring as `popover`, but unlike `tooltip`, it dismisses on outside click or Escape.

**Source:** [context-view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/context-view/context-view.css)

## Użycie

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/context-view.css";
```

## Przykłady

```html
<div class="instui-context-view -placement-bottom" id="cv-popover">A context view frames a callout with a caret. As a popover it rides the top layer and closes when you click away or press Esc.</div>
```

## Modyfikatory

| Modyfikator | Opis |
| --- | --- |
| `.-color-inverse` | Dark (inverse) colour scheme. |
| `.-placement-bottom` | Sit below the anchor. |
| `.-placement-end` | Sit at the end (inline-end) of the anchor. |
| `.-placement-start` | Sit at the start (inline-start) of the anchor. |
| `.-placement-top` | Sit above the anchor. |

## Pseudo-elementy

| Pseudo-element | Opis |
| --- | --- |
| `::after` | Renders the caret's inner fill triangle. |
| `::before` | Renders the caret's outer border triangle. |

## Stany

| Stan | Opis |
| --- | --- |
| `:state(open)` | — |

## Warunki

| Typ | Zapytanie | Opis |
| --- | --- | --- |
| supports | `(position-area: block-end)` | — |

## Zużyte tokeny

| Token | Typ | Wartość |
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

## Wsparcie przeglądarek

- Uses CSS anchor positioning (`position-anchor`, `position-area`, `position-try-fallbacks`) and the native `[popover]` API behind an `@supports` guard; needs a recent Chromium or Safari, and falls back to a UA-centred popover elsewhere.

## Powiązane

- [popover](/pl/api/css/popover.md) — The generic top-layer popover.
- [tooltip](/pl/api/css/tooltip.md) — A smaller hover or focus callout.


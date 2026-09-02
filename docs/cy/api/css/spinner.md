# CSS: spinner

`.instui-spinner` — An animated loading ring; give it role="status" and an aria-label.

`-color-inverse` only repaints the animated top border segment, not the whole track, so it still reads correctly on a dark card without needing a separate track color.

**Source:** [spinner.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/spinner/spinner.css)

## Hygyrchedd

Give the spinner role="status" and an aria-label so screen readers announce it as a live loading status.

## Defnydd

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/spinner.css";
```

## Dangosfa

```demo
self:spinner
```

## Enghreifftiau

```html
<span class="instui-spinner" role="status" aria-label="Loading"></span>
```
### Inverse color -nocard
```html
<div class="instui-view instui-card -background-primary-inverse">
  <span class="instui-spinner -color-inverse" role="status" aria-label="Loading"></span>
</div>
```

## Modyfiwyr

| Modyfiwr | Disgrifiad |
| --- | --- |
| `.-color-inverse` | On a dark surface. |
| `.-size-large` | Large. Long-form alias of `-size-lg`. |
| `.-size-lg` | Large. |
| `.-size-sm` | Small. |
| `.-size-small` | Small. Long-form alias of `-size-sm`. |
| `.-size-x-small` | Extra-small. Long-form alias of `-size-xs`. |
| `.-size-xs` | Extra-small. |

## Animeiddiadau

| Animeiddiad | Disgrifiad |
| --- | --- |
| `pantoken-spinner-rotate` | — |

## Tocynnau a ddefnyddiwyd

| Tocyn | Math | Gwerth |
| --- | --- | --- |
| `--instui-component-spinner-color` | `<color>` | `light-dark(#2871AF, #7FB4F1)` |
| `--instui-component-spinner-inverse-color` | `<color>` | `#ffffff` |
| `--instui-component-spinner-spinner-size-lg` | `<length>` | `4.5rem` |
| `--instui-component-spinner-spinner-size-md` | `<length>` | `3.5rem` |
| `--instui-component-spinner-spinner-size-sm` | `<length>` | `2rem` |
| `--instui-component-spinner-spinner-size-xs` | `<length>` | `1rem` |
| `--instui-component-spinner-stroke-width-lg` | `<length>` | `0.75em` |
| `--instui-component-spinner-stroke-width-md` | `<length>` | `0.5em` |
| `--instui-component-spinner-stroke-width-sm` | `<length>` | `0.375em` |
| `--instui-component-spinner-stroke-width-xs` | `<length>` | `0.25em` |
| `--instui-component-spinner-track-color` | `<color>` | `light-dark(rgba(35,68,101,0.1), rgba(255,255,255,0.1))` |


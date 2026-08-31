# CSS: mask

`.instui-mask` — Una superposició en flux que omple el seu pare posicionat i centra el seu contingut — per exemple, un girador sobre una targeta. Per a un modal, prefereix un `&lt;dialog&gt;` natiu (el seu `::backdrop` és la màscara). Cada un d'aquests modificadors també està disponible globalment (senzill, o encadenat a qualsevol altre component) — vegeu la utilitat global `mask`.

**Font:** [mask.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/mask/mask.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/mask.css";
```

## Examples

```html
<div style="position: relative">
  <div class="instui-mask">
    <span class="instui-spinner"></span>
  </div>
</div>
```

## Modifiers

| Modifier       | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `.-blur`       | Desenfoqui el que hi ha darrere la màscara amb un backdrop-filter. |
| `.-fullscreen` | Fixat a la finestra gràfica, cobrint-la a un z-index alt.          |

## Tokens consumed

| Token                                      | Type      | Value                                                     |
| ------------------------------------------ | --------- | --------------------------------------------------------- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |

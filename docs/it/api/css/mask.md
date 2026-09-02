# CSS: mask

`.instui-mask` — An in-flow overlay that fills its positioned parent and centres its content — e.g. a spinner over a card. For a modal, prefer a native `&lt;dialog&gt;` (its `::backdrop` is the mask). Every one of these modifiers is also available globally (bare, or chained onto any other component) — see the `mask` global utility.

**Source:** [mask.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/mask/mask.css)

## Uso

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/mask.css";
```

## Esempi

```html
<div style="position: relative">
  <div class="instui-mask">
    <span class="instui-spinner"></span>
  </div>
</div>
```

## Modificatori

| Modificatore | Descrizione |
| --- | --- |
| `.-blur` | Blur what's behind the mask with a backdrop-filter. |
| `.-fullscreen` | Fixed to the viewport, covering it at a high z-index. |

## Token consumati

| Token | Tipo | Valore |
| --- | --- | --- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |


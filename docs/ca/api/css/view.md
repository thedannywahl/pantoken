# CSS: view

`.instui-view` — La primitiva View: una caixa neutra amb modificadors de clau-valor per a fons, vora, radi, ombra, pantalla, posició, desbordament i cursor. Cadascun d'aquests modificadors també està disponible globalment (pel seu compte, o encadenat a qualsevol altre component) — consulteu les utilitats `background`/`border`/`shadow`/`display`/`position`/`overflow`/`cursor`.

**Font:** [view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/view/view.css)

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/view.css";
```

## Exemples

```html
<div class="instui-view -background-secondary -border-radius-medium -shadow-resting">
  A card-like surface.
</div>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-background-alert` | Fons de superfície d'alerta. |
| `.-background-brand` | Fons de superfície de marca. |
| `.-background-danger` | Fons de superfície de perill. |
| `.-background-info` | Fons de superfície d'informació. |
| `.-background-primary` | Fons de superfície principal. |
| `.-background-primary-inverse` | Fons de superfície principal invers. |
| `.-background-secondary` | Fons de superfície secundari. |
| `.-background-success` | Fons de superfície d'èxit. |
| `.-background-transparent` | Fons transparent. |
| `.-background-warning` | Fons de superfície d'avís. |
| `.-border-color-brand` | Color de vora de traç de marca. |
| `.-border-color-danger` | Color de vora de traç d'error. |
| `.-border-color-info` | Color de vora de traç d'informació. |
| `.-border-color-primary` | Color de vora de traç base. |
| `.-border-color-success` | Color de vora de traç d'èxit. |
| `.-border-color-warning` | Color de vora de traç d'avís. |
| `.-border-radius-circle` | Radi completament circular (50%). |
| `.-border-radius-large` | Radi de cantonada gran. |
| `.-border-radius-medium` | Radi de cantonada mitjà. |
| `.-border-radius-pill` | Radi totalment arrodonit. |
| `.-border-radius-small` | Radi de cantonada petit. |
| `.-border-width-large` | Vora sòlida gran en el color de traç base. |
| `.-border-width-medium` | Vora sòlida mitjana en el color de traç base. |
| `.-border-width-small` | Vora sòlida petita en el color de traç base. |
| `.-cursor-auto` | cursor: auto. |
| `.-cursor-default` | cursor: default. |
| `.-cursor-grab` | cursor: grab. |
| `.-cursor-move` | cursor: move. |
| `.-cursor-not-allowed` | cursor: not-allowed. |
| `.-cursor-pointer` | cursor: pointer. |
| `.-cursor-text` | cursor: text. |
| `.-cursor-wait` | cursor: wait. |
| `.-display-block` | display: block. |
| `.-display-flex` | display: flex. |
| `.-display-inline` | display: inline. |
| `.-display-inline-block` | display: inline-block. |
| `.-display-inline-flex` | display: inline-flex. |
| `.-display-none` | display: none. |
| `.-overflow-x-auto` | overflow-x: auto. |
| `.-overflow-x-clip` | overflow-x: clip. |
| `.-overflow-x-hidden` | overflow-x: hidden. |
| `.-overflow-x-scroll` | overflow-x: scroll. |
| `.-overflow-x-visible` | overflow-x: visible. |
| `.-overflow-y-auto` | overflow-y: auto. |
| `.-overflow-y-clip` | overflow-y: clip. |
| `.-overflow-y-hidden` | overflow-y: hidden. |
| `.-overflow-y-scroll` | overflow-y: scroll. |
| `.-overflow-y-visible` | overflow-y: visible. |
| `.-position-absolute` | posició: absolute. |
| `.-position-fixed` | posició: fixed. |
| `.-position-relative` | posició: relative. |
| `.-position-static` | posició: static. |
| `.-position-sticky` | posició: sticky. |
| `.-shadow-above` | Ombra d'elevació superposada. |
| `.-shadow-resting` | Ombra d'elevació en repòs. |
| `.-shadow-topmost` | Ombra d'elevació superior. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-border-radius-full` | `<length>` | `999rem` |
| `--instui-border-radius-lg` | `<length>` | `0.75rem` |
| `--instui-border-radius-md` | `<length>` | `0.5rem` |
| `--instui-border-radius-sm` | `<length>` | `0.25rem` |
| `--instui-border-width-lg` | `<length>` | `0.25rem` |
| `--instui-border-width-md` | `<length>` | `0.125rem` |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-color-stroke-brand` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-stroke-error` | `<color>` | `#E62429` |
| `--instui-color-stroke-info` | `<color>` | `#2B7ABC` |
| `--instui-color-stroke-success` | `<color>` | `#03893D` |
| `--instui-color-stroke-warning` | `<color>` | `#CF4A00` |
| `--instui-component-view-background-alert` | `<color>` | `#2B7ABC` |
| `--instui-component-view-background-brand` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-view-background-danger` | `<color>` | `#E62429` |
| `--instui-component-view-background-info` | `<color>` | `#2B7ABC` |
| `--instui-component-view-background-primary` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-view-background-primary-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-view-background-secondary` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-component-view-background-success` | `<color>` | `#03893D` |
| `--instui-component-view-background-warning` | `<color>` | `#CF4A00` |
| `--instui-elevation-above` | `none \| <shadow>#` | — |
| `--instui-elevation-resting` | `none \| <shadow>#` | — |
| `--instui-elevation-topmost` | `none \| <shadow>#` | — |


# CSS: view

`.instui-view` — View-primitiv: en neutral boks med nøgle-værdi modifikatorer til baggrund, kant, radius, skygge, display, position, overløb og markør. Hver af disse modifikatorer er også tilgængelig globalt (alene eller kombineret med enhver anden komponent) — se `background`/`border`/`shadow`/`display`/`position`/`overflow`/`cursor` værktøjer.

**Kilde:** [view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/view/view.css)

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/view.css";
```

## Eksempler

```html
<div class="instui-view -background-secondary -border-radius-medium -shadow-resting">
  A card-like surface.
</div>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-background-alert` | Advarsels overfladebaggrund. |
| `.-background-brand` | Mærke overfladebaggrund. |
| `.-background-danger` | Fare overfladebaggrund. |
| `.-background-info` | Info overfladebaggrund. |
| `.-background-primary` | Primær overfladebaggrund. |
| `.-background-primary-inverse` | Invers primær overfladebaggrund. |
| `.-background-secondary` | Sekundær overfladebaggrund. |
| `.-background-success` | Succes overfladebaggrund. |
| `.-background-transparent` | Transparent baggrund. |
| `.-background-warning` | Advarsel overfladebaggrund. |
| `.-border-color-brand` | Mærke slag kantfarve. |
| `.-border-color-danger` | Fejl slag kantfarve. |
| `.-border-color-info` | Info slag kantfarve. |
| `.-border-color-primary` | Basis slag kantfarve. |
| `.-border-color-success` | Succes slag kantfarve. |
| `.-border-color-warning` | Advarsel slag kantfarve. |
| `.-border-radius-circle` | Fuldt cirkulær (50%) radius. |
| `.-border-radius-large` | Stor hjørneradius. |
| `.-border-radius-medium` | Medium hjørneradius. |
| `.-border-radius-pill` | Pille (fuld) radius. |
| `.-border-radius-small` | Lille hjørneradius. |
| `.-border-width-large` | Stor solid kant i basis slag kantfarve. |
| `.-border-width-medium` | Medium solid kant i basis slag kantfarve. |
| `.-border-width-small` | Lille solid kant i basis slag kantfarve. |
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
| `.-position-absolute` | position: absolute. |
| `.-position-fixed` | position: fixed. |
| `.-position-relative` | position: relative. |
| `.-position-static` | position: static. |
| `.-position-sticky` | position: sticky. |
| `.-shadow-above` | Over højde skygge. |
| `.-shadow-resting` | Hvile højde skygge. |
| `.-shadow-topmost` | Øverste højde skygge. |

## Forbrugte tokens

| Token | Type | Værdi |
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


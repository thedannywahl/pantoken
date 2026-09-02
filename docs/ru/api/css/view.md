# CSS: view

`.instui-view` — The View primitive: a neutral box with key-value modifiers for background, border, radius, shadow, display, position, overflow, and cursor. Every one of these modifiers is also available globally (bare, or chained onto any other component) — see the `background`/`border`/`shadow`/`display`/`position`/`overflow`/`cursor` utilities.

**Source:** [view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/view/view.css)

## Использование

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/view.css";
```

## Примеры

```html
<div class="instui-view -background-secondary -border-radius-medium -shadow-resting">
  A card-like surface.
</div>
```

## Модификаторы

| Модификатор | Описание |
| --- | --- |
| `.-background-alert` | Alert surface background. |
| `.-background-brand` | Brand surface background. |
| `.-background-danger` | Danger surface background. |
| `.-background-info` | Info surface background. |
| `.-background-primary` | Primary surface background. |
| `.-background-primary-inverse` | Inverse primary surface background. |
| `.-background-secondary` | Secondary surface background. |
| `.-background-success` | Success surface background. |
| `.-background-transparent` | Transparent background. |
| `.-background-warning` | Warning surface background. |
| `.-border-color-brand` | Brand stroke border colour. |
| `.-border-color-danger` | Error stroke border colour. |
| `.-border-color-info` | Info stroke border colour. |
| `.-border-color-primary` | Base stroke border colour. |
| `.-border-color-success` | Success stroke border colour. |
| `.-border-color-warning` | Warning stroke border colour. |
| `.-border-radius-circle` | Fully circular (50%) radius. |
| `.-border-radius-large` | Large corner radius. |
| `.-border-radius-medium` | Medium corner radius. |
| `.-border-radius-pill` | Pill (full) radius. |
| `.-border-radius-small` | Small corner radius. |
| `.-border-width-large` | Large solid border in the base stroke colour. |
| `.-border-width-medium` | Medium solid border in the base stroke colour. |
| `.-border-width-small` | Small solid border in the base stroke colour. |
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
| `.-shadow-above` | Above elevation shadow. |
| `.-shadow-resting` | Resting elevation shadow. |
| `.-shadow-topmost` | Topmost elevation shadow. |

## Использованные токены

| Токен | Тип | Значение |
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


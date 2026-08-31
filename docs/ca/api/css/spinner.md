# CSS: spinner

`.instui-spinner` — Un anell de càrrega animat; doneu-li rol="status" i una aria-label.

`-color-inverse` només repinta el segment del límit superior animat, no tota la pista, de manera que segueix llegint correctament en una targeta fosca sense necessitat d'un color de pista separat.

**Font:** [spinner.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/spinner/spinner.css)

## Accessibility

Doneu al filador rol="status" i una aria-label per que els lectors de pantalla l'anunciïn com a estat de càrrega en directe.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/spinner.css";
```

## Demo

```demo
self:spinner
```

## Examples

```html
<span class="instui-spinner" role="status" aria-label="Loading"></span>
```

### Inverse color -nocard

```html
<div class="instui-view instui-card -background-primary-inverse">
  <span class="instui-spinner -color-inverse" role="status" aria-label="Loading"></span>
</div>
```

## Modifiers

| Modifier          | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `.-color-inverse` | En una superfície fosca.                              |
| `.-size-large`    | Gran. Àlias de forma llarga de `-size-lg`.            |
| `.-size-lg`       | Gran.                                                 |
| `.-size-sm`       | Petit.                                                |
| `.-size-small`    | Petit. Àlias de forma llarga de `-size-sm`.           |
| `.-size-x-small`  | Extra petit. Pseudònim de forma llarga de `-size-xs`. |
| `.-size-xs`       | Extra petit.                                          |

## Animations

| Animation                 | Description |
| ------------------------- | ----------- |
| `pantoken-spinner-rotate` | —           |

## Tokens consumed

| Token                                        | Type       | Value                                                    |
| -------------------------------------------- | ---------- | -------------------------------------------------------- |
| `--instui-component-spinner-color`           | `<color>`  | `light-dark(#2871AF, #7FB4F1)`                           |
| `--instui-component-spinner-inverse-color`   | `<color>`  | `#ffffff`                                                |
| `--instui-component-spinner-spinner-size-lg` | `<length>` | `4.5rem`                                                 |
| `--instui-component-spinner-spinner-size-md` | `<length>` | `3.5rem`                                                 |
| `--instui-component-spinner-spinner-size-sm` | `<length>` | `2rem`                                                   |
| `--instui-component-spinner-spinner-size-xs` | `<length>` | `1rem`                                                   |
| `--instui-component-spinner-stroke-width-lg` | `<length>` | `0.75em`                                                 |
| `--instui-component-spinner-stroke-width-md` | `<length>` | `0.5em`                                                  |
| `--instui-component-spinner-stroke-width-sm` | `<length>` | `0.375em`                                                |
| `--instui-component-spinner-stroke-width-xs` | `<length>` | `0.25em`                                                 |
| `--instui-component-spinner-track-color`     | `<color>`  | `light-dark(rgba(35,68,101,0.1), rgba(255,255,255,0.1))` |

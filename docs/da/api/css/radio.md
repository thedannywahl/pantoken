# CSS: radio

`.instui-radio` — En naturlig radioknap og dens etiket.

Indstiller sin egen `gap` mellem kontrolelementet og dets etiket; sammenkædning af en `-gap-*` afstandsverktøj-modifier tilsidesætter denne indbyggede værdi.

**Kilde:** [radio.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/radio/radio.css)

## Accessibility

En naturlig `<input type="radio">` styrer `:checked` og `:disabled`; `-readonly` er kun styling, da radioknapper ikke har en naturlig readonly-attribut.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/radio.css";
```

## Examples

```html
<label class="instui-radio"><input type="radio" name="r" checked /> Option A</label>
```

## Modifiers

| Modifier            | Description                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `.-context-danger`  | Fare-kontekstfarve (toggle-variant).                                                              |
| `.-context-off`     | Sluk/neutral kontekstfarve (toggle-variant).                                                      |
| `.-context-success` | Succes-kontekstfarve (toggle-variant).                                                            |
| `.-context-warning` | Advarsels-kontekstfarve (toggle-variant).                                                         |
| `.-readonly`        | Skrivebeskyttet tilstand.                                                                         |
| `.-size-large`      | Stor. Langt-form alias af `-size-lg`.                                                             |
| `.-size-lg`         | Stor.                                                                                             |
| `.-size-sm`         | Lille.                                                                                            |
| `.-size-small`      | Lille. Langt-form alias af `-size-sm`.                                                            |
| `.-toggle`          | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-variant-toggle`. |
| `.-variant-toggle`  | Gengives som en segmenteret toggle-knap.                                                          |

## Pseudo-elements

| Pseudo-element | Description                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `::before`     | Den fyldte indre prik, der vises, når der er markeret; på `-variant-toggle` er det fokusringen tegnet lige uden for pilleret. |

## States

| State       | Description |
| ----------- | ----------- |
| `:checked`  | —           |
| `:disabled` | —           |

## Custom properties

| Property             | Type      | Default | Description                                                                   |
| -------------------- | --------- | ------- | ----------------------------------------------------------------------------- |
| `--pantoken-rt-fill` | `<color>` | —       | Toggle-afkrydsningens valgte fyldfarve; -context-* modifierne indstiller den. |

## Tokens consumed

| Token                                                      | Type                                               | Value                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-radio-input-background-color`          | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-radio-input-background-disabled-color` | `<color>`                                          | `light-dark(#E8EAEC, #334450)`                                               |
| `--instui-component-radio-input-background-hover-color`    | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-radio-input-background-readonly-color` | `<color>`                                          | `light-dark(#C7CACD, #6A7883)`                                               |
| `--instui-component-radio-input-border-color`              | `<color>`                                          | `light-dark(#7E8792, #5F6E7A)`                                               |
| `--instui-component-radio-input-border-disabled-color`     | `<color>`                                          | `light-dark(#C7CACD, #4A5B68)`                                               |
| `--instui-component-radio-input-border-hover-color`        | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-radio-input-border-readonly-color`     | `<color>`                                          | `#8D959F`                                                                    |
| `--instui-component-radio-input-border-selected-color`     | `<color>`                                          | `light-dark(#1C222B, #ffffff)`                                               |
| `--instui-component-radio-input-border-width`              | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-radio-input-checked-inset-lg`          | `<length>`                                         | `0.375rem`                                                                   |
| `--instui-component-radio-input-checked-inset-md`          | `<length>`                                         | `0.375rem`                                                                   |
| `--instui-component-radio-input-checked-inset-sm`          | `<length>`                                         | `0.375rem`                                                                   |
| `--instui-component-radio-input-control-size-lg`           | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-control-size-md`           | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-control-size-sm`           | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-control-vertical-margin`   | `<length>`                                         | `0rem`                                                                       |
| `--instui-component-radio-input-font-family`               | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-radio-input-font-size-lg`              | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-radio-input-font-size-md`              | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-radio-input-font-size-sm`              | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-radio-input-font-weight`               | `<integer>`                                        | `400`                                                                        |
| `--instui-component-radio-input-gap`                       | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-radio-input-label-base-color`          | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-radio-input-label-disabled-color`      | `<color>`                                          | `light-dark(#8D959F, #576773)`                                               |
| `--instui-component-radio-input-label-hover-color`         | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-radio-input-label-readonly-color`      | `<color>`                                          | `light-dark(#273540, #F2F4F5)`                                               |
| `--instui-component-radio-input-line-height-lg`            | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-line-height-md`            | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-radio-input-line-height-sm`            | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-radio-input-toggle-background-danger`  | `<color>`                                          | `#CF4A00`                                                                    |
| `--instui-component-radio-input-toggle-background-off`     | `<color>`                                          | `#03893D`                                                                    |
| `--instui-component-radio-input-toggle-background-success` | `<color>`                                          | `#03893D`                                                                    |
| `--instui-component-radio-input-toggle-background-warning` | `<color>`                                          | `#CF4A00`                                                                    |
| `--instui-component-radio-input-toggle-border-radius`      | `<length>`                                         | `0.25rem`                                                                    |
| `--instui-component-radio-input-toggle-handle-text`        | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-radio-input-toggle-large-font-size`    | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-radio-input-toggle-large-height`       | `<length>`                                         | `3rem`                                                                       |
| `--instui-component-radio-input-toggle-medium-font-size`   | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-radio-input-toggle-medium-height`      | `<length>`                                         | `2.5rem`                                                                     |
| `--instui-component-radio-input-toggle-small-font-size`    | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-radio-input-toggle-small-height`       | `<length>`                                         | `2rem`                                                                       |
| `--instui-elevation-depth1`                                | `none \| <shadow>#`                                | —                                                                            |
| `--instui-focus-outline-color`                             | `auto \| <color>`                                  | —                                                                            |
| `--instui-focus-outline-style`                             | `auto \| <outline-line-style>`                     | —                                                                            |
| `--instui-focus-outline-width`                             | `<line-width>`                                     | —                                                                            |

## Related

- [checkbox](/da/api/css/checkbox.md) — Multi-select-modstykket til en single-select radio.
- [radio-input-group](/da/api/css/radio-input-group.md) — Indsamler radioknapper i ét single-select fieldset.

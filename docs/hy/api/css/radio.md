# CSS: radio

`.instui-radio` — Բնական ռադիո կոճակ և նրա պիտակ:

Սահմանում է իր սեփական `gap` կառավարման և նրա պիտակի միջև; `-gap-*` տարածական օգտակար փոփոխիչ շղթայացնելը գերակերպում է այդ ներկառուցված արժեքը:

**Աղբյուր:** [radio.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/radio/radio.css)

## Accessibility

Բնական `<input type="radio">` վարում է `:checked` և `:disabled`; `-readonly` միայն ձևավորում է, քանի որ ռադիոները չունեն բնական readonly հատկանիշ:

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
| `.-context-danger`  | Վտանգավոր համատեքստի գույն (միացման տարբերակ):                                                    |
| `.-context-off`     | Անջատ/չեզոք համատեքստի գույն (միացման տարբերակ):                                                  |
| `.-context-success` | Հաջողության համատեքստի գույն (միացման տարբերակ):                                                  |
| `.-context-warning` | Զգուշացման համատեքստի գույն (միացման տարբերակ):                                                   |
| `.-readonly`        | Միայն կարդալու համար վիճակ:                                                                       |
| `.-size-large`      | Մեծ. Երկար-ձեւ այլանունը `-size-lg`:                                                              |
| `.-size-lg`         | Մեծ:                                                                                              |
| `.-size-sm`         | Փոքր:                                                                                             |
| `.-size-small`      | Փոքր. Երկար-ձեւ այլանունը `-size-sm`:                                                             |
| `.-toggle`          | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-variant-toggle`. |
| `.-variant-toggle`  | Ցուցադրել որպես բաժանված միացման կոճակ:                                                           |

## Pseudo-elements

| Pseudo-element | Description                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `::before`     | Լցված ներքին կետ, որը ցուցադրվում է ստուգելիս; `-variant-toggle`-ի վրա դա կենտրոնացման օղակ է, որը նկարված է դրսից մի քանի պիքսել հեռու: |

## States

| State       | Description |
| ----------- | ----------- |
| `:checked`  | —           |
| `:disabled` | —           |

## Custom properties

| Property             | Type      | Default | Description                                                           |
| -------------------- | --------- | ------- | --------------------------------------------------------------------- |
| `--pantoken-rt-fill` | `<color>` | —       | Միացման ընտրված լցման գույն; -context-* փոփոխիչները այն սահմանում են: |

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

- [checkbox](/hy/api/css/checkbox.md) — Բազմ ընտրության համապատասխանը միայն ընտրության ռադիոյի:
- [radio-input-group](/hy/api/css/radio-input-group.md) — Հավաք ռադիոները միայն ընտրության դաշտի մեջ:

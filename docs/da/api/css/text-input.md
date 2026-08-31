# CSS: text-input

`.instui-text-input` — Et stiliseret native `&lt;input&gt;` — herunder `date`, `time` og `datetime-local`, hvor browseren leverer vælgeren — med valideringstilstande og størrelser.

Deler sin kant, baggrund og tilstands-krom med `text-area`, `simple-select`, `number-input` og `input-group`; for `date`/`time`/`datetime-local` typer leverer browseren sin egen vælger-UI, som dette stylesheet ikke stiliserer.

**Kilde:** [text-input.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text-input/text-input.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text-input.css";
```

## Examples

```html
<input class="instui-text-input" placeholder="Default" />
```

## Modifiers

| Modifier        | Description                                   |
| --------------- | --------------------------------------------- |
| `.-disabled`    | Deaktiveret tilstand.                         |
| `.-invalid`     | Ugyldigt (fejl) tilstand.                     |
| `.-readonly`    | Skrivebeskyttet tilstand.                     |
| `.-size-large`  | Stor. Langt-form alias af `-size-lg`.         |
| `.-size-lg`     | Stor.                                         |
| `.-size-md`     | (standard) Mellem.                            |
| `.-size-medium` | (standard) Mellem. Langt alias af `-size-md`. |
| `.-size-sm`     | Lille.                                        |
| `.-size-small`  | Lille. Langt-form alias af `-size-sm`.        |
| `.-success`     | Succestilstand (gyldig).                      |

## Pseudo-elements

| Pseudo-element  | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `::placeholder` | Pladsholder-teksten i en dæmpet farve, der skifter ved hovering. |

## States

| State       | Description |
| ----------- | ----------- |
| `:disabled` | —           |

## Tokens consumed

| Token                                                     | Type                                               | Value                                                                        |
| --------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-text-input-background-color`          | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-text-input-background-disabled-color` | `<color>`                                          | `light-dark(#E8EAEC, #334450)`                                               |
| `--instui-component-text-input-background-hover-color`    | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-text-input-background-readonly-color` | `<color>`                                          | `light-dark(#C7CACD, #6A7883)`                                               |
| `--instui-component-text-input-border-color`              | `<color>`                                          | `light-dark(#7E8792, #5F6E7A)`                                               |
| `--instui-component-text-input-border-disabled-color`     | `<color>`                                          | `light-dark(#C7CACD, #4A5B68)`                                               |
| `--instui-component-text-input-border-hover-color`        | `<color>`                                          | `light-dark(#334450, #7E8792)`                                               |
| `--instui-component-text-input-border-radius`             | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-input-border-readonly-color`     | `<color>`                                          | `#8D959F`                                                                    |
| `--instui-component-text-input-border-width`              | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-text-input-error-border-color`        | `<color>`                                          | `light-dark(#CF1F24, #F56050)`                                               |
| `--instui-component-text-input-font-family`               | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-input-font-size-lg`              | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-text-input-font-size-md`              | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-text-input-font-size-sm`              | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-text-input-font-weight`               | `<integer>`                                        | `500`                                                                        |
| `--instui-component-text-input-height-lg`                 | `<length>`                                         | `3rem`                                                                       |
| `--instui-component-text-input-height-md`                 | `<length>`                                         | `2.5rem`                                                                     |
| `--instui-component-text-input-height-sm`                 | `<length>`                                         | `2rem`                                                                       |
| `--instui-component-text-input-padding-horizontal-lg`     | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-input-padding-horizontal-md`     | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-input-padding-horizontal-sm`     | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-text-input-placeholder-color`         | `<color>`                                          | `light-dark(#5F6E7A, #7E8792)`                                               |
| `--instui-component-text-input-placeholder-hover-color`   | `<color>`                                          | `light-dark(#334450, #9EA6AD)`                                               |
| `--instui-component-text-input-success-border-color`      | `<color>`                                          | `light-dark(#037D37, #3EA75B)`                                               |
| `--instui-component-text-input-text-color`                | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-text-input-text-disabled-color`       | `<color>`                                          | `light-dark(#8D959F, #9EA6AD)`                                               |
| `--instui-component-text-input-text-readonly-color`       | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-focus-outline-color-danger`                     | `auto \| <color>`                                  | —                                                                            |
| `--instui-focus-outline-color-success`                    | `auto \| <color>`                                  | —                                                                            |

## Related

- [text-area](/da/api/css/text-area.md) — Den multi-linje modpart med samme tilstande og størrelser.
- [number-input](/da/api/css/number-input.md) — Det numeriske inputfelt, der deler denne krom.
- [simple-select](/da/api/css/simple-select.md) — Det native select, der deler denne felt-krom.
- [input-group](/da/api/css/input-group.md) — Omslutter dette inputfelt med førende og efterfølgende felter.

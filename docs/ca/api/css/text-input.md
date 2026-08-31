# CSS: text-input

`.instui-text-input` — Un `&lt;input&gt;` nativa estilitzada — incloent `date`, `time` i `datetime-local`, on el navegador proporciona el selector — amb estats de validació i mides.

Comparteix els seus límits, fons i cromi d'estat amb `text-area`, `simple-select`, `number-input` i `input-group`; per als tipus `date`/`time`/`datetime-local` el navegador proporciona la seva pròpia interfície de selector, que aquest full d'estils no estilitza.

**Font:** [text-input.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text-input/text-input.css)

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

| Modifier        | Description                                               |
| --------------- | --------------------------------------------------------- |
| `.-disabled`    | Estat desactivat.                                         |
| `.-invalid`     | Estat no vàlid (error).                                   |
| `.-readonly`    | Estat de només lectura.                                   |
| `.-size-large`  | Gran. Àlias de forma llarga de `-size-lg`.                |
| `.-size-lg`     | Gran.                                                     |
| `.-size-md`     | (per defecte) Mitjà.                                      |
| `.-size-medium` | (per defecte) Mitjà. Àlies de forma llarga de `-size-md`. |
| `.-size-sm`     | Petit.                                                    |
| `.-size-small`  | Petit. Àlias de forma llarga de `-size-sm`.               |
| `.-success`     | Estat d'èxit (vàlid).                                     |

## Pseudo-elements

| Pseudo-element  | Description                                                                                |
| --------------- | ------------------------------------------------------------------------------------------ |
| `::placeholder` | El text de marcador de posició, en un color esmorteït que es modifica en passar el ratolí. |

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

- [text-area](/ca/api/css/text-area.md) — L'homòleg de múltiples línies amb els mateixos estats i mides.
- [number-input](/ca/api/css/number-input.md) — L'entrada numèrica que comparteix aquest crom.
- [simple-select](/ca/api/css/simple-select.md) — El select nativa que comparteix aquest crom de camp.
- [input-group](/ca/api/css/input-group.md) — Embolcalla aquesta entrada amb ranures inicials i finals.

# CSS: text-area

`.instui-text-area` — Un `&lt;textarea&gt;` nativa estilitzada i redimensionable amb els mateixos estats i mides que l'entrada de text.

Comparteix els seus límits, fons i estats de focus amb `text-input` i `simple-select`; només `resize: vertical` i l'alçada mínima més gran li són únics.

**Font:** [text-area.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text-area/text-area.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text-area.css";
```

## Examples

```html
<textarea class="instui-text-area" placeholder="Write a comment…"></textarea>
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

| Token                                                    | Type                                               | Value                                                                        |
| -------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-text-area-background-color`          | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-text-area-background-disabled-color` | `<color>`                                          | `light-dark(#E8EAEC, #334450)`                                               |
| `--instui-component-text-area-background-hover-color`    | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-text-area-background-readonly-color` | `<color>`                                          | `light-dark(#C7CACD, #6A7883)`                                               |
| `--instui-component-text-area-border-color`              | `<color>`                                          | `light-dark(#7E8792, #5F6E7A)`                                               |
| `--instui-component-text-area-border-disabled-color`     | `<color>`                                          | `light-dark(#C7CACD, #4A5B68)`                                               |
| `--instui-component-text-area-border-hover-color`        | `<color>`                                          | `light-dark(#334450, #7E8792)`                                               |
| `--instui-component-text-area-border-radius`             | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-area-border-readonly-color`     | `<color>`                                          | `#8D959F`                                                                    |
| `--instui-component-text-area-border-width`              | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-text-area-error-border-color`        | `<color>`                                          | `#CF1F24`                                                                    |
| `--instui-component-text-area-font-family`               | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-area-font-size-lg`              | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-text-area-font-size-md`              | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-text-area-font-size-sm`              | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-text-area-font-weight`               | `<integer>`                                        | `400`                                                                        |
| `--instui-component-text-area-padding`                   | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-area-placeholder-color`         | `<color>`                                          | `light-dark(#5F6E7A, #7E8792)`                                               |
| `--instui-component-text-area-placeholder-hover-color`   | `<color>`                                          | `light-dark(#334450, #9EA6AD)`                                               |
| `--instui-component-text-area-success-border-color`      | `<color>`                                          | `light-dark(#037D37, #3EA75B)`                                               |
| `--instui-component-text-area-text-color`                | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-text-area-text-disabled-color`       | `<color>`                                          | `light-dark(#8D959F, #9EA6AD)`                                               |
| `--instui-component-text-area-text-readonly-color`       | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-focus-outline-color-danger`                    | `auto \| <color>`                                  | —                                                                            |
| `--instui-focus-outline-color-success`                   | `auto \| <color>`                                  | —                                                                            |

## Related

- [text-input](/ca/api/css/text-input.md) — L'homòleg d'una sola línia amb els mateixos estats i mides.

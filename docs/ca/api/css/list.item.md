# CSS: list.item

`.instui-list` — Un element de llista (InstUI `List.Item`).

Els modificadors `-size-sm`/`-size-lg`, `-ordered`, i `-delimiter-solid`/`-delimiter-dashed` del `list` principal reestilen aquest membre — mira la documentació pròpia de `list` per a aquests modificadors.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/list.item.css";
```

## Modifiers

| Modifier             | Description                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| `.-delimiter-dashed` | Separa els elements amb una regla puntejada. @affects list.item — Afegeix la regla delimitadora entre elements. |
| `.-delimiter-solid`  | Separa els elements amb una regla sòlida. @affects list.item — Afegeix la regla delimitadora entre elements.    |
| `.-ordered`          | Numeració de llista ordenada. @affects list.item — Afegeix pes de marcador i sagnia.                            |
| `.-size-large`       | Àlies de forma llarga de `-size-lg`.                                                                            |
| `.-size-medium`      | Àlies de forma llarga de `-size-md`.                                                                            |
| `.-size-small`       | Àlies de forma llarga de `-size-sm`.                                                                            |

## Pseudo-elements

| Pseudo-element | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `::marker`     | Representa la bala de llista o el número de la llista ordenada. |

## Tokens consumed

| Token                                                        | Type                                               | Value                                                                        |
| ------------------------------------------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-list-item-color`                         | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-list-item-delimiter-dashed-border-color` | `<color>`                                          | `light-dark(#E8EAEC, #2D3D49)`                                               |
| `--instui-component-list-item-delimiter-dashed-border-style` | —                                                  | `dashed`                                                                     |
| `--instui-component-list-item-delimiter-dashed-border-width` | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-list-item-delimiter-solid-border-color`  | `<color>`                                          | `light-dark(#E8EAEC, #2D3D49)`                                               |
| `--instui-component-list-item-delimiter-solid-border-style`  | —                                                  | `solid`                                                                      |
| `--instui-component-list-item-delimiter-solid-border-width`  | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-list-item-font-family`                   | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-list-item-font-size-large`               | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-list-item-font-size-medium`              | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-list-item-font-size-small`               | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-list-item-font-weight`                   | `<integer>`                                        | `400`                                                                        |
| `--instui-component-list-item-line-height`                   | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-list-item-spacing-medium`                | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-list-ordered-number-font-weight`         | `<integer>`                                        | `600`                                                                        |
| `--instui-component-list-ordered-number-margin`              | `<length>`                                         | `0.5rem`                                                                     |

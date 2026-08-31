# CSS: side-nav-bar.item

`.item` — Una entrada de navegació (InstUI `SideNavBar.Item`); `-selected` marca l'activa.

El modificador `-minimized` del `side-nav-bar` pare amaga el `.label` d'aquest membre — vegeu la documentació pròpia de `side-nav-bar` per a aquest modificador.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/side-nav-bar.item.css";
```

## Modifiers

| Modifier     | Description                   |
| ------------ | ----------------------------- |
| `.-selected` | L'element de navegació actiu. |

## Parts

| Part     | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| `.label` | L'etiqueta de text de l'element; ocult quan la barra es minimitza. |

## Tokens consumed

| Token                                                            | Type                                                                                                  | Value                          |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------ |
| `--instui-component-side-nav-bar-item-background-color`          | `<color>`                                                                                             | `transparent`                  |
| `--instui-component-side-nav-bar-item-border-radius`             | `<length>`                                                                                            | `0.75rem`                      |
| `--instui-component-side-nav-bar-item-content-padding`           | `<length>`                                                                                            | `0.375rem`                     |
| `--instui-component-side-nav-bar-item-font-color`                | `<color>`                                                                                             | `light-dark(#273540, #ffffff)` |
| `--instui-component-side-nav-bar-item-font-size`                 | `<length>`                                                                                            | `0.875rem`                     |
| `--instui-component-side-nav-bar-item-font-weight`               | `<integer>`                                                                                           | `400`                          |
| `--instui-component-side-nav-bar-item-hover-background-color`    | `<color>`                                                                                             | `light-dark(#EEF4FD, #273540)` |
| `--instui-component-side-nav-bar-item-line-height`               | `<percentage>`                                                                                        | `150%`                         |
| `--instui-component-side-nav-bar-item-link-text-decoration`      | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `none`                         |
| `--instui-component-side-nav-bar-item-selected-background-color` | `<color>`                                                                                             | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-side-nav-bar-item-selected-font-color`       | `<color>`                                                                                             | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-side-nav-bar-minimized-width`                | `<length>`                                                                                            | `3.75rem`                      |
| `--instui-spacing-space2xs`                                      | `<length>`                                                                                            | `0.125rem`                     |

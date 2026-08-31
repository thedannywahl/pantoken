# CSS: side-nav-bar.item

`.item` — Նավիգացիայի գրառում (InstUI `SideNavBar.Item`); `-selected`-ը նշում է ակտիվը:

Ծնից `side-nav-bar`-ի `-minimized` փոփոխիչը թաքցնում է այս անդամի `.label` — տես `side-nav-bar`-ի սեփական փ այդ փոփոխիչի համար:

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/side-nav-bar.item.css";
```

## Modifiers

| Modifier     | Description             |
| ------------ | ----------------------- |
| `.-selected` | Ակտիվ նավիգացիայի տարր: |

## Parts

| Part     | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| `.label` | Տարի տեքստային պիտակ; թաքցված է, երբ ճանապարհաթերթն փոքրացված է: |

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

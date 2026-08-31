# CSS: menu.item

`.item` — Ընտրացանկի գրառում (InstUI `Menu.Item`); ավելացնել -disabled, -highlighted կամ -active/[aria-checked]:

## Accessibility

Նշել ստուգված տարրը `aria-checked="true"` (նույն ոճավորում, ինչ `-active`):

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/menu.item.css";
```

## Modifiers

| Modifier        | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| `.-active`      | Ակտիվ/ստուգված ընդգծում; նույն ոճավորում, ինչ `[aria-checked="true"]`: |
| `.-disabled`    | Խամրված, ոչ ինտերակտիվ:                                                |
| `.-highlighted` | Ընդգծված ֆոն/տեքստ (ստեղնաշար ֆոկուս կամ hover):                       |

## Parts

| Part         | Description                                   |
| ------------ | --------------------------------------------- |
| `.item-info` | Երկրորդային տեղեկատվական տեքստ տարրի ներսում: |

## States

| State                   | Description |
| ----------------------- | ----------- |
| `[aria-checked="true"]` | —           |

## Tokens consumed

| Token                                                          | Type                                               | Value                                                                        |
| -------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-menu-item-active-background`               | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-menu-item-active-label-color`              | `<color>`                                          | `light-dark(#ffffff, #1D354F)`                                               |
| `--instui-component-menu-item-font-family`                     | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-menu-item-font-size`                       | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-menu-item-font-weight`                     | `<integer>`                                        | `400`                                                                        |
| `--instui-component-menu-item-highlighted-background`          | `<color>`                                          | `light-dark(#EEF4FD, #2E5177)`                                               |
| `--instui-component-menu-item-highlighted-label-color`         | `<color>`                                          | `light-dark(#273540, #F2F4F5)`                                               |
| `--instui-component-menu-item-highlighted-label-info-color`    | `<color>`                                          | `light-dark(#273540, #F2F4F5)`                                               |
| `--instui-component-menu-item-label-color`                     | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-menu-item-label-info-color`                | `<color>`                                          | `light-dark(#576773, #AAB0B5)`                                               |
| `--instui-component-menu-item-line-height`                     | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-menu-item-padding-horizontal`              | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-menu-item-padding-vertical`                | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-menu-item-selected-highlighted-background` | `<color>`                                          | `light-dark(#234465, #ffffff)`                                               |
| `--instui-opacity-disabled`                                    | `<number>`                                         | `0.5`                                                                        |

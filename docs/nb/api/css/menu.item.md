# CSS: menu.item

`.item` — A menu entry (InstUI `Menu.Item`); add -disabled, -highlighted, or -active/[aria-checked].

## Tilgjengelighet

Mark a checked item with `aria-checked="true"` (same styling as `-active`).

## Bruk

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/menu.item.css";
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-active` | Active/checked highlight; same styling as `[aria-checked="true"]`. |
| `.-disabled` | Muted, non-interactive. |
| `.-highlighted` | Highlighted background/text (keyboard focus or hover). |

## Deler

| Del | Beskrivelse |
| --- | --- |
| `.item-info` | Secondary info text within the item. |

## Tilstander

| Tilstand | Beskrivelse |
| --- | --- |
| `[aria-checked="true"]` | — |

## Forbrukte tokens

| Token | Type | Verdi |
| --- | --- | --- |
| `--instui-component-menu-item-active-background` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-menu-item-active-label-color` | `<color>` | `light-dark(#ffffff, #1D354F)` |
| `--instui-component-menu-item-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-menu-item-font-size` | `<length>` | `1rem` |
| `--instui-component-menu-item-font-weight` | `<integer>` | `400` |
| `--instui-component-menu-item-highlighted-background` | `<color>` | `light-dark(#EEF4FD, #2E5177)` |
| `--instui-component-menu-item-highlighted-label-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-menu-item-highlighted-label-info-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-menu-item-label-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-menu-item-label-info-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-menu-item-line-height` | `<length>` | `1.25rem` |
| `--instui-component-menu-item-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-menu-item-padding-vertical` | `<length>` | `0.5rem` |
| `--instui-component-menu-item-selected-highlighted-background` | `<color>` | `light-dark(#234465, #ffffff)` |
| `--instui-opacity-disabled` | `<number>` | `0.5` |


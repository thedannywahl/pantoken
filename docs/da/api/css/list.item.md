# CSS: list.item

`.instui-list` — Et listeelement (InstUI `List.Item`).

Forældrens `list`'s `-size-sm`/`-size-lg`, `-ordered`, og `-delimiter-solid`/`-delimiter-dashed` modifiers omstyler dette medlem — se `list`'s egen dokumentation for disse modifiers.

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/list.item.css";
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-delimiter-dashed` | Adskil elementer med en stiplet regel. @affects list.item — Tilføjer skillelinjen mellem elementer. |
| `.-delimiter-solid` | Adskil elementer med en fuld regel. @affects list.item — Tilføjer skillelinjen mellem elementer. |
| `.-ordered` | Nummerering af ordnet liste. @affects list.item — Tilføjer markeringsvægt og indrykning. |
| `.-size-large` | Lang form alias af `-size-lg`. |
| `.-size-medium` | Lang form alias af `-size-md`. |
| `.-size-small` | Lang form alias af `-size-sm`. |

## Pseudo-elementer

| Pseudo-element | Beskrivelse |
| --- | --- |
| `::marker` | Gengiver liste punktet eller ordnet-liste nummeret. |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-component-list-item-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-list-item-delimiter-dashed-border-color` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-list-item-delimiter-dashed-border-style` | — | `dashed` |
| `--instui-component-list-item-delimiter-dashed-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-list-item-delimiter-solid-border-color` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-list-item-delimiter-solid-border-style` | — | `solid` |
| `--instui-component-list-item-delimiter-solid-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-list-item-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-list-item-font-size-large` | `<length>` | `1.25rem` |
| `--instui-component-list-item-font-size-medium` | `<length>` | `1rem` |
| `--instui-component-list-item-font-size-small` | `<length>` | `0.875rem` |
| `--instui-component-list-item-font-weight` | `<integer>` | `400` |
| `--instui-component-list-item-line-height` | `<percentage>` | `150%` |
| `--instui-component-list-item-spacing-medium` | `<length>` | `1.5rem` |
| `--instui-component-list-ordered-number-font-weight` | `<integer>` | `600` |
| `--instui-component-list-ordered-number-margin` | `<length>` | `0.5rem` |


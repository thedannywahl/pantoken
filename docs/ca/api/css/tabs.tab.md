# CSS: tabs.tab

`.tab` — Un sol botó de pestanya (InstUI `Tabs.Tab`, configurat via la llista de pestanyes del pare `Tabs`); `-selected` marca l'actiu.

El modificador `-variant-secondary` del pare `tabs` reformata aquest membre en una pestanya "carpeta" arrodonida — consulta la documentació pròpia de `tabs` per a aquest modificador.

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tabs.tab.css";
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-disabled` | No interactiu; el mateix estil que `[aria-disabled="true"]`/`:disabled`. |
| `.-selected` | La pestanya activa; el mateix estil que `[aria-selected="true"]`. |

## Estats

| Estat | Descripció |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `[aria-selected="true"]` | — |
| `:disabled` | — |
| `:state(selected)` | — |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-tabs-panel-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-tabs-tab-default-hover-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-tabs-tab-default-selected-border-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tabs-tab-default-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-tabs-tab-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-tabs-tab-font-size` | `<length>` | `1rem` |
| `--instui-component-tabs-tab-font-weight` | `<integer>` | `400` |
| `--instui-component-tabs-tab-line-height` | `<percentage>` | `125%` |
| `--instui-component-tabs-tab-secondary-selected-background` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tabs-tab-secondary-selected-border-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tabs-tab-secondary-selected-text-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-tabs-tab-secondary-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |


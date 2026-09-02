# CSS: tabs.tab

`.tab` — Մեկ ներդրման կոճակ (InstUI `Tabs.Tab`՝ կազմաձևված ծնողական `Tabs`-ի ներդրման ցուցակի միջոցով); `-selected`-ը նշում է ակտիվ մեկը:

Ծնողական `tabs`-ի `-variant-secondary` փոփոխիչը վերափոխում է այս անդամին կլորացված "թղթապանակ" ներդրում — տե՛ս `tabs`-ի սեփական փ documentation-ը այդ փոփոխիչի համար:

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tabs.tab.css";
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-disabled` | Ոչ ինտերակտիվ; նույն ոճ `[aria-disabled="true"]`/`:disabled`-ի հետ: |
| `.-selected` | Ակտիվ ներդրում; նույն ոճ `[aria-selected="true"]`-ի հետ: |

## Փոփոխական վիճակներ

| Վիճակ | Նկարագիր |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `[aria-selected="true"]` | — |
| `:disabled` | — |
| `:state(selected)` | — |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
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


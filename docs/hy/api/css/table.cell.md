# CSS: table.cell

`td` — Տվյալների բջիջ (InstUI `Table.Cell`):

Ծնողական `table`-ի `-layout-stacked` փոփոխիչը կուտակում է այս անդամին որպես բլոկ և պիտակավորում է այն `::before`-ի միջոցով — տե՛ս `table`-ի սեփական փ documentation-ը այդ փոփոխիչի համար:

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/table.cell.css";
```

## Պսևդո-էլեմենտներ

| Պսևդո-էլեմենտ | Նկարագիր |
| --- | --- |
| `::before` | — |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-component-table-cell-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-cell-line-height` | `<percentage>` | `125%` |
| `--instui-component-table-cell-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-table-cell-padding-vertical` | `<length>` | `0.5rem` |
| `--instui-component-table-col-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-head-font-weight` | `<integer>` | `600` |


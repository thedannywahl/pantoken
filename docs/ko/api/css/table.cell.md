# CSS: table.cell

`td` — A data cell (InstUI `Table.Cell`).

The parent `table`'s `-layout-stacked` modifier stacks this member as a block and labels it via `::before` — see `table`'s own doc for that modifier.

## 사용법

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/table.cell.css";
```

## 의사 요소

| 의사 요소 | 설명 |
| --- | --- |
| `::before` | — |

## 사용된 토큰

| 토큰 | 타입 | 값 |
| --- | --- | --- |
| `--instui-component-table-cell-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-cell-line-height` | `<percentage>` | `125%` |
| `--instui-component-table-cell-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-table-cell-padding-vertical` | `<length>` | `0.5rem` |
| `--instui-component-table-col-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-head-font-weight` | `<integer>` | `600` |


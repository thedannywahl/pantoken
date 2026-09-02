# CSS: table.row-header

`th[scope="row"]` — A row-header cell (InstUI `Table.RowHeader`); styled from the row-header tokens, not the column-header ones.

The parent `table`'s `-layout-stacked` modifier stacks this member as a block and labels it via `::before` — see `table`'s own doc for that modifier.

## Uso

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/table.row-header.css";
```

## Pseudoelementos

| Pseudoelemento | Descripción |
| --- | --- |
| `::before` | — |

## Tokens consumidos

| Token | Tipo | Valor |
| --- | --- | --- |
| `--instui-component-table-col-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-head-font-weight` | `<integer>` | `600` |
| `--instui-component-table-row-header-background` | `<color>` | `light-dark(#ffffff, #10141A)` |
| `--instui-component-table-row-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-row-header-font-weight` | `<integer>` | `400` |
| `--instui-component-table-row-header-line-height` | `<percentage>` | `125%` |
| `--instui-component-table-row-header-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-table-row-header-padding-vertical` | `<length>` | `0.5rem` |


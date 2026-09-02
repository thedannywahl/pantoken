# CSS: table.row-header

`th[scope="row"]` — Una cel·la de capçalera de fila (InstUI `Table.RowHeader`); amb estil dels tokens de capçalera de fila, no dels de capçalera de columna.

El modificador `-layout-stacked` del pare `table` apila aquest membre com a bloc i l'etiqueta via `::before` — consulta la documentació pròpia de `table` per a aquest modificador.

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/table.row-header.css";
```

## Pseudoelements

| Pseudoelement | Descripció |
| --- | --- |
| `::before` | — |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-table-col-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-head-font-weight` | `<integer>` | `600` |
| `--instui-component-table-row-header-background` | `<color>` | `light-dark(#ffffff, #10141A)` |
| `--instui-component-table-row-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-row-header-font-weight` | `<integer>` | `400` |
| `--instui-component-table-row-header-line-height` | `<percentage>` | `125%` |
| `--instui-component-table-row-header-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-table-row-header-padding-vertical` | `<length>` | `0.5rem` |


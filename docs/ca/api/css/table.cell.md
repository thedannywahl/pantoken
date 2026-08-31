# CSS: table.cell

`td` — Una cel·la de dades (InstUI `Table.Cell`).

El modificador `-layout-stacked` del pare `table` apila aquest membre com a bloc i l'etiqueta via `::before` — consulta la documentació pròpia de `table` per a aquest modificador.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/table.cell.css";
```

## Pseudo-elements

| Pseudo-element | Description |
| -------------- | ----------- |
| `::before`     | —           |

## Tokens consumed

| Token                                              | Type           | Value                          |
| -------------------------------------------------- | -------------- | ------------------------------ |
| `--instui-component-table-cell-color`              | `<color>`      | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-cell-line-height`        | `<percentage>` | `125%`                         |
| `--instui-component-table-cell-padding-horizontal` | `<length>`     | `0.75rem`                      |
| `--instui-component-table-cell-padding-vertical`   | `<length>`     | `0.5rem`                       |
| `--instui-component-table-col-header-color`        | `<color>`      | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-head-font-weight`        | `<integer>`    | `600`                          |

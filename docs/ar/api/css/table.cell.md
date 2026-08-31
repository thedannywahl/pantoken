# CSS: table.cell

`td` — خلية البيانات (InstUI `Table.Cell`).

يجمع تعديل `-layout-stacked` من `table` الأب هذا العضو كتجمع ويسميه عبر `::before` — انظر إلى المستند الخاص به `table` لهذا التعديل.

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

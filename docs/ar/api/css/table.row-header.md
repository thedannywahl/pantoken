# CSS: table.row-header

`th[scope="row"]` — خلية رأس الصف (InstUI `Table.RowHeader`); مصممة من رموز رأس الصف، وليس من رموز رأس العمود.

يجمع تعديل `-layout-stacked` من `table` الأب هذا العضو كتجمع ويسميه عبر `::before` — انظر إلى المستند الخاص به `table` لهذا التعديل.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/table.row-header.css";
```

## Pseudo-elements

| Pseudo-element | Description |
| -------------- | ----------- |
| `::before`     | —           |

## Tokens consumed

| Token                                                    | Type           | Value                          |
| -------------------------------------------------------- | -------------- | ------------------------------ |
| `--instui-component-table-col-header-color`              | `<color>`      | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-head-font-weight`              | `<integer>`    | `600`                          |
| `--instui-component-table-row-header-background`         | `<color>`      | `light-dark(#ffffff, #10141A)` |
| `--instui-component-table-row-header-color`              | `<color>`      | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-row-header-font-weight`        | `<integer>`    | `400`                          |
| `--instui-component-table-row-header-line-height`        | `<percentage>` | `125%`                         |
| `--instui-component-table-row-header-padding-horizontal` | `<length>`     | `0.75rem`                      |
| `--instui-component-table-row-header-padding-vertical`   | `<length>`     | `0.5rem`                       |

# CSS: table.row-header

`th[scope="row"]` — En rækkeheader celle (InstUI `Table.RowHeader`); stiliseret fra rækkeheader tokens, ikke kolonneheader tokens.

Forælderen `table`'s `-layout-stacked` modifier stabler dette medlem som en blok og mærker det via `::before` — se `table`'s egen dokumentation for denne modifier.

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

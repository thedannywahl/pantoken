# CSS: table

`.instui-table` — A styled data table for `th` and `td` plus an optional caption, with hover, fixed, and stacked-card layouts.

For `-layout-stacked`, pure CSS can't pull each column header's text into its cell, so give every cell a `data-label` and the stacked card shows it via `::before`. See the `table.head`, `table.body`, `table.row`, `table.cell`, `table.col-header`, and `table.row-header` members for the individual parts.

**Source:** [body.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/table/members/body/body.css)

## Accessibility

Label the table with a `&lt;caption&gt;`, mark column headers `<th scope="col">` and row headers `<th scope="row">`, and in `-layout-stacked` give every cell a `data-label` since the header row is visually hidden.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/table.css";
```

## Examples

```html
<table class="instui-table -hover">
  <caption>Top-rated films</caption>
  <thead>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col">Title</th>
      <th scope="col">Year</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>The Shawshank Redemption</td>
      <td>1994</td>
      <td>9.3</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>The Godfather</td>
      <td>1972</td>
      <td>9.2</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>The Godfather: Part II</td>
      <td>1974</td>
      <td>9.0</td>
    </tr>
  </tbody>
</table>
```

## Structure

```text
.instui-table.-hover
  caption
  thead
    th
  tbody
    tr
      td, th[scope="row"]
```

```mermaid
flowchart TD
  n0[".instui-table.-hover"]:::cssdoc-root
  n1("caption"):::cssdoc-part
  n2("thead"):::cssdoc-part
  n3("th"):::cssdoc-part
  n4("tbody"):::cssdoc-part
  n5("tr"):::cssdoc-part
  n6("td, th[scope=&quot;row&quot;]"):::cssdoc-part
  n0 --> n1
  n2 --> n3
  n0 --> n2
  n5 --> n6
  n4 --> n5
  n0 --> n4
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier | Description |
| --- | --- |
| `.-hover` | Highlight rows on hover. @affects table.row — Reserves and colours the row's hover border. |
| `.-layout-fixed` | Fixed table layout (equal-width columns). |
| `.-layout-stacked` | Stack each row as a card, via a per-cell `data-label`. @affects table.head @affects table.body @affects table.row @affects table.cell @affects table.col-header @affects table.row-header — Stacks each part as a block and hides/labels the header accordingly. |

## Parts

| Part | Description |
| --- | --- |
| `.caption` | An optional table caption. |

## Tokens consumed

| Token | Type | Value |
| --- | --- | --- |
| `--instui-component-table-background` | `<color>` | `light-dark(#ffffff, #10141A)` |
| `--instui-component-table-cell-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-table-cell-padding-vertical` | `<length>` | `0.5rem` |
| `--instui-component-table-col-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-table-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-table-font-size` | `<length>` | `1rem` |
| `--instui-component-table-head-font-weight` | `<integer>` | `600` |

## Subcomponents

- [table.body](/en-GB/api/css/table.body.md)
- [table.cell](/en-GB/api/css/table.cell.md)
- [table.col-header](/en-GB/api/css/table.col-header.md)
- [table.head](/en-GB/api/css/table.head.md)
- [table.row](/en-GB/api/css/table.row.md)
- [table.row-header](/en-GB/api/css/table.row-header.md)


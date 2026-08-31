# CSS: breadcrumb.link

`li` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — Et lem (InstUI `Breadcrumb.Link`), et `&lt;li&gt;` i forælderens `&lt;ol&gt;`; det sidste er den aktuelle side.

Modifikatorerne `-size-sm`/`-size-lg` for forælderen `breadcrumb` justerer dette medlems separatorafstand — se `breadcrumb`'s egen dokumentation for disse modifikatorer.

## Accessibility

Marker den aktuelle sides lem med `aria-current="page"` — på dets `&lt;a&gt;`, hvis det er et link, ellers på `&lt;li&gt;` selv.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/breadcrumb.link.css";
```

## Modifiers

| Modifier        | Description                    |
| --------------- | ------------------------------ |
| `.-size-large`  | Lang form alias af `-size-lg`. |
| `.-size-medium` | Lang form alias af `-size-md`. |
| `.-size-small`  | Lang form alias af `-size-sm`. |

## Pseudo-elements

| Pseudo-element | Description                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| `::after`      | Gengiver chevron-separatoren efter hvert lem undtagen det sidste; afspejler til `chevron-left` i `[dir="rtl"]`. |
| `::before`     | I en sammenfoldet forælder tegner en maskeret tilbage-pil før dette lems næst-sidste link.                      |

## Conditions

| Type  | Query                       | Description                                                           |
| ----- | --------------------------- | --------------------------------------------------------------------- |
| media | `(max-width: 47.9375em)`    | —                                                                     |
| media | `(--breakpoint-large-down)` | Sammenfolder stien, så kun det tidligere lem og en tilbage-pil vises. |

## Tokens consumed

| Token                                      | Type       | Value                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--instui-color-text-muted`                | `<color>`  | `light-dark(#576773, #AAB0B5)`                                                                                                                                                                                                                                                                                                                                             |
| `--instui-component-breadcrumb-gap-lg`     | `<length>` | `0.5rem`                                                                                                                                                                                                                                                                                                                                                                   |
| `--instui-component-breadcrumb-gap-md`     | `<length>` | `0.25rem`                                                                                                                                                                                                                                                                                                                                                                  |
| `--instui-component-breadcrumb-gap-sm`     | `<length>` | `0.125rem`                                                                                                                                                                                                                                                                                                                                                                 |
| `--instui-component-link-text-color`       | `<color>`  | `light-dark(#2369A4, #7FB4F1)`                                                                                                                                                                                                                                                                                                                                             |
| `--instui-component-link-text-hover-color` | `<color>`  | `light-dark(#1A5281, #ACCDF7)`                                                                                                                                                                                                                                                                                                                                             |
| `--instui-icon-chevron-left`               | `<image>`  | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-icon-chevron-right`              | `<image>`  | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E')`  |
| `--instui-spacing-space2xs`                | `<length>` | `0.125rem`                                                                                                                                                                                                                                                                                                                                                                 |

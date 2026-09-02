# CSS: pagination

`.instui-pagination` — Page navigation: numbered pages, first, previous, next, and last arrows, and an ellipsis for gaps.

See the `pagination.page` member for the individual page controls.

**Source:** [page.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/pagination/members/page/page.css)

## Aðgengi

Label the `&lt;nav&gt;` with aria-label, mark the current page with aria-current="page", give each arrow an aria-label, and disable end arrows with disabled or aria-disabled="true".

## Notkun

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/pagination.css";
```

## Dæmi

```html
<nav class="instui-pagination" aria-label="Pagination">
  <button class="arrow" type="button" aria-label="First page" disabled><span class="instui-icon -icon-chevrons-left"></span></button>
  <button class="arrow" type="button" aria-label="Previous page" disabled><span class="instui-icon -icon-chevron-left"></span></button>
  <a class="page" href="#" aria-current="page">1</a>
  <a class="page" href="#">2</a>
  <a class="page" href="#">3</a>
  <span class="ellipsis">…</span>
  <a class="page" href="#">12</a>
  <a class="arrow" href="#" aria-label="Next page"><span class="instui-icon -icon-chevron-right"></span></a>
  <a class="arrow" href="#" aria-label="Last page"><span class="instui-icon -icon-chevrons-right"></span></a>
</nav>
```

## Uppbygging

```text
.instui-pagination
  .arrow
    [class*="-icon-"] (0..1)
  pagination.page (component, 0..n)
  .ellipsis (0..1)
```

```mermaid
flowchart TD
  n0[".instui-pagination"]:::cssdoc-root
  n1(".arrow"):::cssdoc-part
  n2("[class*=&quot;-icon-&quot;]"):::cssdoc-part
  n3(["pagination.page"]):::cssdoc-component
  n4(".ellipsis"):::cssdoc-part
  n1 -.->|0..1| n2
  n0 --> n1
  n0 -->|0..n| n3
  n0 -.->|0..1| n4
  click n3 "/api/css/pagination.page.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Breytingar

| Breyti | Lýsing |
| --- | --- |
| `.-icon-*` | Render arrow glyph icons inside the first/prev/next/last controls. |
| `.-variant-input` | Compact variant with a page-number input. |

## Hlutar

| Hluti | Lýsing |
| --- | --- |
| `.arrow` | A first, previous, next, or last control. |
| `.ellipsis` | The gap marker between page ranges. |
| `.page-input-label` | The label for the page-number input (input variant). |

## Stöður

| Staða | Lýsing |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `:disabled` | — |

## Notuð tákn

| Tákn | Tegund | Gildi |
| --- | --- | --- |
| `--instui-border-width-md` | `<length>` | `0.125rem` |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-text-interactive-navigation-primary-base` | `<color>` | `light-dark(#2369A4, #7FB4F1)` |
| `--instui-color-text-interactive-navigation-primary-hover` | `<color>` | `light-dark(#1A5281, #ACCDF7)` |
| `--instui-color-text-muted` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-base-button-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-pagination-page-indicator-gap` | `<length>` | `0.5rem` |
| `--instui-component-pagination-page-input-input-spacing` | `<length>` | `0.5rem` |
| `--instui-component-pagination-page-input-input-width` | `<length>` | `4.5rem` |
| `--instui-component-pagination-page-input-label-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-font-family-base` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-font-weight-interactive` | `<integer>` | `500` |
| `--instui-opacity-disabled` | `<number>` | `0.5` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

## Undirhlutir

- [pagination.page](/is/api/css/pagination.page.md)


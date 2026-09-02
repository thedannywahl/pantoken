# CSS: breadcrumb.link

`li` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — A crumb (InstUI `Breadcrumb.Link`), an `&lt;li&gt;` in the parent's `&lt;ol&gt;`; the last one is the current page.

The parent `breadcrumb`'s `-size-sm`/`-size-lg` modifiers adjust this member's separator spacing — see `breadcrumb`'s own doc for those modifiers.

## Guhkkinjohka

Mark the current page's crumb with `aria-current="page"` — on its `&lt;a&gt;` if it's a link, otherwise on the `&lt;li&gt;` itself.

## Buktáhašvuohta

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/breadcrumb.link.css";
```

## Modifisuvnnat

| Modifiserer | Deskripción |
| --- | --- |
| `.-size-large` | Long-form alias of `-size-lg`. |
| `.-size-medium` | Long-form alias of `-size-md`. |
| `.-size-small` | Long-form alias of `-size-sm`. |

## Pseudo-elementtat

| Pseudo-element | Deskripción |
| --- | --- |
| `::after` | Renders the chevron separator after every crumb except the last; mirrors to `chevron-left` in `[dir="rtl"]`. |
| `::before` | In a collapsed parent draws a masked back-arrow before this crumb's second-to-last link. |

## Divottat / Kondišuvnnat

| Type | Kysimus | Deskripción |
| --- | --- | --- |
| media | `(max-width: 47.9375em)` | — |
| media | `(--breakpoint-large-down)` | Collapses the trail, showing only the previous crumb and a back arrow. |

## Tokenat gaskkalit

| Token | Type | Vaššun |
| --- | --- | --- |
| `--instui-color-text-muted` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-breadcrumb-gap-lg` | `<length>` | `0.5rem` |
| `--instui-component-breadcrumb-gap-md` | `<length>` | `0.25rem` |
| `--instui-component-breadcrumb-gap-sm` | `<length>` | `0.125rem` |
| `--instui-component-link-text-color` | `<color>` | `light-dark(#2369A4, #7FB4F1)` |
| `--instui-component-link-text-hover-color` | `<color>` | `light-dark(#1A5281, #ACCDF7)` |
| `--instui-icon-chevron-left` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-icon-chevron-right` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |


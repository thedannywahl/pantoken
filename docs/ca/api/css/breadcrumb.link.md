# CSS: breadcrumb.link

`li` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — Una miiga (InstUI `Breadcrumb.Link`), un `&lt;li&gt;` a `&lt;ol&gt;` del pare; l'últim és la pàgina actual.

Els modificadors `-size-sm`/`-size-lg` del pare `breadcrumb` ajusten l'espaiat del separador d'aquest membre — consulteu la documentació pròpia de `breadcrumb` per a aquests modificadors.

## Accessibilitat

Marqueu la miiga de la pàgina actual amb `aria-current="page"` — a `&lt;a&gt;` si és un enllaç, o a `&lt;li&gt;` mateix.

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/breadcrumb.link.css";
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-size-large` | Àlies de forma llarga de `-size-lg`. |
| `.-size-medium` | Àlies de forma llarga de `-size-md`. |
| `.-size-small` | Àlies de forma llarga de `-size-sm`. |

## Pseudoelements

| Pseudoelement | Descripció |
| --- | --- |
| `::after` | Representa el separador chevron després de cada miiga excepte l'última; es reflecteix a `chevron-left` a `[dir="rtl"]`. |
| `::before` | En un pare col·lapsat dibuixa una fletxa enrere emmascarada abans de l'enllaç penúltim d'aquesta miiga. |

## Condicions

| Tipus | Consulta | Descripció |
| --- | --- | --- |
| media | `(max-width: 47.9375em)` | — |
| media | `(--breakpoint-large-down)` | Col·lapsa el camí, mostrant només la miiga anterior i una fletxa enrere. |

## Tokens consumits

| Token | Tipus | Valor |
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


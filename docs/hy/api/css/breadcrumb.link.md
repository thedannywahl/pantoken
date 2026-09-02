# CSS: breadcrumb.link

`li` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — Հաբ (InstUI `Breadcrumb.Link`), `&lt;li&gt;` ծնողի `&lt;ol&gt;`-ում; վերջինը ընթացիկ էջն է:

Ծնող `breadcrumb`-ի `-size-sm`/`-size-lg` փոփոխիչները ճշգրտում են այս անդամի բաժանարար հեռավորությունը — տե՛ս `breadcrumb`-ի սեփական փաստաթուղթ այդ փոփոխիչների համար:

## Մուտքականություն

Նշեք ընթացիկ էջի հաբը `aria-current="page"`-ով — նրա `&lt;a&gt;`-ում, եթե այն հղում է, հակառակ դեպքում `&lt;li&gt;`-ի վրա:

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/breadcrumb.link.css";
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-size-large` | `-size-lg`-ի երկար ձևի անվանում: |
| `.-size-medium` | `-size-md`-ի երկար ձևի անվանում: |
| `.-size-small` | `-size-sm`-ի երկար ձևի անվանում: |

## Պսևդո-էլեմենտներ

| Պսևդո-էլեմենտ | Նկարագիր |
| --- | --- |
| `::after` | Հավաքածուն վերջինից բացի յուրաքանչյուր հաբի հետևից շեւրոն բաժանարար; հայտնվում է `[dir="rtl"]`-ի `chevron-left`-ի վրա: |
| `::before` | Փլուզված ծնողի մեջ նկարում է դիմավոր սլաք այս հաբի երկրորդ-վերջին հղման առաջ: |

## Պայմաններ

| Տիպ | Հարցում | Նկարագիր |
| --- | --- | --- |
| media | `(max-width: 47.9375em)` | — |
| media | `(--breakpoint-large-down)` | Փլուզում է հետքերը՝ ցույց տալով միայն նախորդ հաբը և սլաք ետ: |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
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


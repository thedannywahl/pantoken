# CSS: drawer-layout.content

`.content` — հիմնական բովանդակության վահանակ, որը լրացնում է մնացած տարածությունը դարակի կողքին:

Երբ ծնողի inline-size-ը ընկնի `46em`-ից (`16em` դարակի լայնություն + `30em` breakpoint), `@container` հարցումը ծնողի `pantoken-drawer-layout` կոնտեյներում հեռացնում է այս անդամի `min-inline-size`-ը `0`-ի վրա ինքնաբերաբար՝ համընկնելով ձեռքով `[should-overlay-tray]` վերակայմանը:

## Մուտքականություն

Կրեք `role="region"` (InstUI-ի DrawerLayout պայմանավորվածություն) և անվանեք այն `aria-label`/`aria-labelledby`-ով, երբ համատեքստը միայնակ չի նույնականացնում այն:

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/drawer-layout.content.css";
```

## Օրինակներ

```html
<div class="instui-drawer-layout">
  <div class="content" role="region">
    <p class="instui-text">Tray content</p>
  </div>
</div>
```

## Կառուցվածք

```text
@scope (@component drawer-layout)
  .content
    ‹content›
```

```mermaid
flowchart TD
  subgraph sg0 ["@scope (@component drawer-layout)"]
  n1(".content"):::cssdoc-part
  n2[/"‹content›"/]:::cssdoc-slot
  end
  n1 --> n2
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Պայմաններ

| Տիպ | Հարցում | Նկարագիր |
| --- | --- | --- |
| container | `pantoken-drawer-layout (max-width: 46em)` | — |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--drawer-layout-content-min-inline-size` | `<length>` | — |
| `--pantoken-bp-md` | `<length>` | `30em` |

## Ավելին կապված

- [drawer-layout.tray](/hy/api/css/drawer-layout.tray.md) — հարակից վահանակ նույն flex տողում:


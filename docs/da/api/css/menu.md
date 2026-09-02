# CSS: menu

`.instui-menu` — En dropdown-flade med elementer, grupper og skillelinjer.

Opbyg indgange som `.item` (se medlemmet `menu.item`), mærk en sektion med `.group` (se `menu.group`), og opdel sektioner med `.separator` (se `menu.separator`).

**Kilde:** [group.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/menu/members/group/group.css)

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/menu.css";
```

## Eksempler

-nocard
```html
<div class="instui-menu">
  <div class="group">Actions</div>
  <div class="item">Edit</div>
  <div class="item -active">Duplicate</div>
  <div class="separator"></div>
  <div class="item">Delete</div>
</div>
```

## Struktur

```text
.instui-menu
  menu.group (component, 0..1)
  side-nav-bar.item (component, 0..n)
  menu.separator (component, 0..1)
```

```mermaid
flowchart TD
  n0[".instui-menu"]:::cssdoc-root
  n1(["menu.group"]):::cssdoc-component
  n2(["side-nav-bar.item"]):::cssdoc-component
  n3(["menu.separator"]):::cssdoc-component
  n0 -.->|0..1| n1
  n0 -->|0..n| n2
  n0 -.->|0..1| n3
  click n1 "/api/css/menu.group.md"
  click n2 "/api/css/side-nav-bar.item.md"
  click n3 "/api/css/menu.separator.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-border-radius-md` | `<length>` | `0.5rem` |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-menu-item-background` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-menu-max-width` | `<length>` | `16em` |
| `--instui-component-menu-min-width` | `<length>` | `8em` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## Underkomponenter

- [menu.group](/da/api/css/menu.group.md)
- [menu.item](/da/api/css/menu.item.md)
- [menu.separator](/da/api/css/menu.separator.md)
- [side-nav-bar.item](/da/api/css/side-nav-bar.item.md)

## Relateret

- [tree-browser](/da/api/css/tree-browser.md) — Begge præsenterer indlejrede, valgbare indgange.
- [simple-select](/da/api/css/simple-select.md) — En selects dropdown genbruger denne menu-flade.


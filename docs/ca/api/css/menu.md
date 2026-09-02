# CSS: menu

`.instui-menu` — Una superfície desplegable d'elements, grups i separadors.

Compondre entrades com a `.item` (vegeu el membre `menu.item`), etiquetar una secció amb `.group` (vegeu `menu.group`), i dividir seccions amb `.separator` (vegeu `menu.separator`).

**Font:** [group.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/menu/members/group/group.css)

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/menu.css";
```

## Exemples

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

## Estructura

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

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-border-radius-md` | `<length>` | `0.5rem` |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-menu-item-background` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-menu-max-width` | `<length>` | `16em` |
| `--instui-component-menu-min-width` | `<length>` | `8em` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## Subcomponents

- [menu.group](/ca/api/css/menu.group.md)
- [menu.item](/ca/api/css/menu.item.md)
- [menu.separator](/ca/api/css/menu.separator.md)
- [side-nav-bar.item](/ca/api/css/side-nav-bar.item.md)

## Relacionat

- [tree-browser](/ca/api/css/tree-browser.md) — Tots dos presenten entrades imbricades seleccionables.
- [simple-select](/ca/api/css/simple-select.md) — El desplegable d'una selecció reutilitza aquesta superfície de menú.


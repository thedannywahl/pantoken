# CSS: side-nav-bar

`.instui-side-nav-bar` — A vertical navigation rail of icon-over-label items, with a minimized icons-only mode.

Sets its own `gap` between nav items and its own `padding`; chaining a `-gap-*`/`-p-*`/`-padding-*` spacing utility modifier overrides those built-in values. See the `side-nav-bar.item` member for the individual nav entries.

**Source:** [item.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/side-nav-bar/members/item/item.css)

## Toegankelijkheid

Label the `&lt;nav&gt;` with aria-label so it's announced as a named navigation landmark.

## Gebruik

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/side-nav-bar.css";
```

## Voorbeelden

```html
<nav class="instui-side-nav-bar" aria-label="Primary">
  <a class="item -selected" href="#">
    <span class="instui-icon -icon-house"></span>
    <span class="label">Home</span>
  </a>
  <a class="item" href="#">
    <span class="instui-icon -icon-inbox"></span>
    <span class="label">Inbox</span>
  </a>
  <a class="item" href="#">
    <span class="instui-icon -icon-calendar"></span>
    <span class="label">Calendar</span>
  </a>
  <a class="item" href="#">
    <span class="instui-icon -icon-settings"></span>
    <span class="label">Settings</span>
  </a>
</nav>
```

## Structuur

```text
.instui-side-nav-bar
  side-nav-bar.item (component, 1..n)
```

```mermaid
flowchart TD
  n0[".instui-side-nav-bar"]:::cssdoc-root
  n1(["side-nav-bar.item"]):::cssdoc-component
  n0 -->|1..n| n1
  click n1 "/api/css/side-nav-bar.item.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier | Beschrijving |
| --- | --- |
| `.-icon-*` | Render a glyph icon in each nav item. |
| `.-minimized` | Collapse to icons only (labels hidden). @affects side-nav-bar.item — Hides the item's label. |

## Onderdelen

| Onderdeel | Beschrijving |
| --- | --- |
| `.label` | The nav item's text label. |

## Gebruikte tokens

| Token | Type | Waarde |
| --- | --- | --- |
| `--instui-component-side-nav-bar-background-color` | `<color>` | `light-dark(#ffffff, #273540)` |
| `--instui-component-side-nav-bar-content-gap` | `<length>` | `0.25rem` |
| `--instui-component-side-nav-bar-content-margin` | `<length>` | `0.375rem` |
| `--instui-component-side-nav-bar-font-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-side-nav-bar-item-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-side-nav-bar-minimized-width` | `<length>` | `3.75rem` |

## Subcomponenten

- [side-nav-bar.item](/nl/api/css/side-nav-bar.item.md)


# CSS: wrapper

`body[class~="instui-display-flex"]` — App-shell row: side nav, container with header, and optional panel.

✅ Use Wrapper when:

- Building a full Canvas product page that needs a consistent layout shell
- The page uses GlobalNav as the primary navigation anchor
- The page needs side panels: ContentTabList, TrailingContentArea, or a UtilityPanel
- You need consistent container padding and content max-width across the full page
🚫 Don't use Wrapper when:

- Building a Modal, Tray, or Drawer — those have their own layout containers
- Wrapping a sub-section of a page — Wrapper contains the full page, not a region

## Tilgjengelighet

- Map the main content area to a &lt;main&gt; landmark with a skip-nav link so keyboard users can bypass GlobalNav
- Give ContentTabList role="navigation" with a distinct aria-label such as "Page navigation" — separate from GlobalNav's landmark
- Give TrailingContentArea role="complementary" with a descriptive aria-label that reflects its content, such as "Student details"
- Give each UtilityPanel a distinct aria-label: "AI assistant", "Notifications", or "Filters"
- When a UtilityPanel opens, move focus into the panel; when it closes, return focus to the trigger that opened it

## Bruk

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Struktur

```text
body[class~="instui-display-flex"]
  side-nav-bar (component)
  .container
    modal.header (component)
      .top
        breadcrumb (component)
        .utilities (0..1)
          button + button (component, 1..n)
      .info
        .title
        .description (0..1)
      ‹content: header› (0..1)
      .actions (0..1)
        button + button (component, 1..n)
      tabs (component, 0..1)
        tabs (component)
      .filters (0..1)
        ‹content: filters›
    drawer-layout.content (component)
      list + card (component, 0..1)
      slot[name="content"].main
      slot[name="trailing"].trailing + card (component, 0..1)
  tabs.panel (component)
    card | agent-shell (component, 0..1)
```

```mermaid
flowchart TD
  n0["body[class~=&quot;instui-display-flex&quot;]"]:::cssdoc-root
  n1(["side-nav-bar"]):::cssdoc-component
  n2(".container"):::cssdoc-part
  n3(["modal.header"]):::cssdoc-component
  n4(".top"):::cssdoc-part
  n5(["breadcrumb"]):::cssdoc-component
  n6(".utilities"):::cssdoc-part
  n7(["button + button"]):::cssdoc-component
  n8(".info"):::cssdoc-part
  n9(".title"):::cssdoc-part
  n10(".description"):::cssdoc-part
  n11[/"‹content: header›"/]:::cssdoc-slot
  n12(".actions"):::cssdoc-part
  n13(["button + button"]):::cssdoc-component
  n14(["tabs"]):::cssdoc-component
  n15(["tabs"]):::cssdoc-component
  n16(".filters"):::cssdoc-part
  n17[/"‹content: filters›"/]:::cssdoc-slot
  n18(["drawer-layout.content"]):::cssdoc-component
  n19([".list + card"]):::cssdoc-component
  n20("slot[name=&quot;content&quot;].main"):::cssdoc-part
  n21(["slot[name=&quot;trailing&quot;].trailing + card"]):::cssdoc-component
  n22(["tabs.panel"]):::cssdoc-component
  n23(["card | agent-shell"]):::cssdoc-component
  n0 --> n1
  n4 --> n5
  n6 -->|1..n| n7
  n4 -.->|0..1| n6
  n3 --> n4
  n8 --> n9
  n8 -.->|0..1| n10
  n3 --> n8
  n3 -.->|0..1| n11
  n12 -->|1..n| n13
  n3 -.->|0..1| n12
  n14 --> n15
  n3 -.->|0..1| n14
  n16 --> n17
  n3 -.->|0..1| n16
  n2 --> n3
  n18 -.->|0..1| n19
  n18 --> n20
  n18 -.->|0..1| n21
  n2 --> n18
  n0 --> n2
  n22 -.->|0..1| n23
  n0 --> n22
  click n1 "/api/css/side-nav-bar.md"
  click n3 "/api/css/modal.header.md"
  click n5 "/api/css/breadcrumb.md"
  click n7 "/api/css/button.md"
  click n13 "/api/css/button.md"
  click n14 "/api/css/tabs.md"
  click n15 "/api/css/tabs.md"
  click n18 "/api/css/drawer-layout.content.md"
  click n19 "/api/css/card.md"
  click n21 "/api/css/card.md"
  click n22 "/api/css/tabs.panel.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Slots

| Slot | Beskrivelse |
| --- | --- |
| `content` | Primary page content. |
| `filters` | Optional filters content inside the header. |
| `header` | Optional header slot below page description. |
| `panel` | Utility panel content. |
| `trailing` | Trailing complementary content. |

## Deler

| Del | Beskrivelse |
| --- | --- |
| `.actions` | Optional header buttons at the end of the top row. |
| `.container` | Main page column that holds header and content. |
| `.content` | Primary content region inside the container column. |
| `.description` | Optional page description below the title. |
| `.filters` | Optional filters region inside the header. |
| `.header` | Header region inside the container column. |
| `.info` | Container for page title and optional description. |
| `.list` | Optional navigation column inside content. |
| `.main` | Main content column inside content. |
| `.panel` | Utility panel region that opens on the right side of the page. |
| `.tabs` | Optional navigation tabs at the start of the content row. |
| `.title` | Page title below the top row. |
| `.top` | Grid row containing breadcrumbs and utilities. |
| `.trailing` | Optional complementary column inside content. |
| `.utilities` | Utility actions at the end of the top row. |

## Tilstander

| Tilstand | Beskrivelse |
| --- | --- |
| `:optional` | — |

## Forbrukte tokens

| Token | Type | Verdi |
| --- | --- | --- |
| `--instui-background-color-page` | — | — |

## Underkomponenter

- [agent-shell](/nb/api/css/agent-shell.md)
- [breadcrumb](/nb/api/css/breadcrumb.md)
- [button](/nb/api/css/button.md)
- [card](/nb/api/css/card.md)
- [drawer-layout.content](/nb/api/css/drawer-layout.content.md)
- [list](/nb/api/css/list.md)
- [modal.header](/nb/api/css/modal.header.md)
- [side-nav-bar](/nb/api/css/side-nav-bar.md)
- [tabs](/nb/api/css/tabs.md)
- [tabs.panel](/nb/api/css/tabs.panel.md)

## Relatert

- [card](/nb/api/css/card.md)
- [agent-shell](/nb/api/css/agent-shell.md)
- [breadcrumb](/nb/api/css/breadcrumb.md)
- [tabs](/nb/api/css/tabs.md)
- [button](/nb/api/css/button.md)
- [heading](/nb/api/css/heading.md)


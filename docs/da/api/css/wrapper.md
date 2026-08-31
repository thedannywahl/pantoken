# CSS: wrapper

`body[class~="instui-display-flex"]` — App-skal række: side nav, beholder med header og valgfrit panel.

✅ Brug Wrapper når:

- Opbygning af en fuld Canvas-produktside, der har brug for et konsistent layoutskal
- Siden bruger GlobalNav som det primære navigationsfixpunkt
- Siden har brug for sidepaneler: ContentTabList, TrailingContentArea eller en UtilityPanel
- Du skal have ensartet containerudvoldning og maksimal indholdsbredde på hele siden
  🚫 Brug ikke Wrapper når:

- Opbygning af en Modal, Tray eller Drawer — de har deres egne layoutcontainere
- Omslutning af et underafsnit på en side — Wrapper indeholder hele siden, ikke et område

## Accessibility

- Kortlæg hovedindholdsområdet til et &lt;main&gt;-landemærke med et skip-nav-link, så tastaturbrugere kan omgå GlobalNav
- Giv ContentTabList rolle="navigation" med en særskilt aria-label som f.eks. "Sidenavigation" — adskilt fra GlobalNav's landemærke
- Giv TrailingContentArea rolle="complementary" med en beskrivende aria-label, der afspejler dens indhold, som f.eks. "Studerendeoplysninger"
- Giv hvert UtilityPanel et særskilt aria-label: "AI-assistent", "Meddelelser" eller "Filtre"
- Når et UtilityPanel åbnes, skal fokus flyttes til panelet; når det lukkes, skal fokus returneres til udløseren, der åbnede det

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Structure

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

| Slot       | Description                                 |
| ---------- | ------------------------------------------- |
| `content`  | Primært sideindhold.                        |
| `filters`  | Valgfrit filterindhold inde i headeren.     |
| `header`   | Valgfrit headerslot under sidebeskrivelsen. |
| `panel`    | Indhold af utility-panel.                   |
| `trailing` | Bagfølgende komplementært indhold.          |

## Parts

| Part           | Description                                              |
| -------------- | -------------------------------------------------------- |
| `.actions`     | Valgfrie headerknapper ved slutningen af øverste række.  |
| `.container`   | Hovedsidekolonne, der indeholder header og indhold.      |
| `.content`     | Primært indholdsområde inde i containerkolonnen.         |
| `.description` | Valgfri sidebeskrivelse under titlen.                    |
| `.filters`     | Valgfrit filterområde inde i headeren.                   |
| `.header`      | Headerregion inde i containerkolonnen.                   |
| `.info`        | Container til sidetitel og valgfri beskrivelse.          |
| `.list`        | Valgfri navigationkolonne inde i indhold.                |
| `.main`        | Hovedindholdskolonne inde i indhold.                     |
| `.panel`       | Utility-panelregion, der åbnes på højre side af siden.   |
| `.tabs`        | Valgfrit navigationsfaner ved starten af indholdsrækken. |
| `.title`       | Sidetitel under øverste række.                           |
| `.top`         | Gitterrække indeholdende brødkrummer og utilities.       |
| `.trailing`    | Valgfri komplementær kolonne inde i indhold.             |
| `.utilities`   | Utility-handlinger ved slutningen af øverste række.      |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                            | Type | Value |
| -------------------------------- | ---- | ----- |
| `--instui-background-color-page` | —    | —     |

## Subcomponents

- [agent-shell](/da/api/css/agent-shell.md)
- [breadcrumb](/da/api/css/breadcrumb.md)
- [button](/da/api/css/button.md)
- [card](/da/api/css/card.md)
- [drawer-layout.content](/da/api/css/drawer-layout.content.md)
- [list](/da/api/css/list.md)
- [modal.header](/da/api/css/modal.header.md)
- [side-nav-bar](/da/api/css/side-nav-bar.md)
- [tabs](/da/api/css/tabs.md)
- [tabs.panel](/da/api/css/tabs.panel.md)

## Related

- [card](/da/api/css/card.md)
- [agent-shell](/da/api/css/agent-shell.md)
- [breadcrumb](/da/api/css/breadcrumb.md)
- [tabs](/da/api/css/tabs.md)
- [button](/da/api/css/button.md)
- [heading](/da/api/css/heading.md)

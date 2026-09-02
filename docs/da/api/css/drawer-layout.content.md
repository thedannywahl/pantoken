# CSS: drawer-layout.content

`.content` — Hovedindholdsruden, der udfylder det resterende område ved siden af bakken.

Når moderelementets inline-size falder under `46em` (`16em` bakkebredde + `30em` breakpoint), sænker en `@container` forespørgsel på moderelementets `pantoken-drawer-layout` beholder automatisk dette members `min-inline-size` til `0`, hvilket matcher den manuelle `[should-overlay-tray]` tilsidesættelse.

## Tilgængelighed

Bær `role="region"` (InstUI's DrawerLayout-konvention) og navngiv det med `aria-label`/`aria-labelledby`, når kontekst alene ikke identificerer det.

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/drawer-layout.content.css";
```

## Eksempler

```html
<div class="instui-drawer-layout">
  <div class="content" role="region">
    <p class="instui-text">Tray content</p>
  </div>
</div>
```

## Struktur

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

## Betingelser

| Type | Forespørgsel | Beskrivelse |
| --- | --- | --- |
| container | `pantoken-drawer-layout (max-width: 46em)` | — |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--drawer-layout-content-min-inline-size` | `<length>` | — |
| `--pantoken-bp-md` | `<length>` | `30em` |

## Relateret

- [drawer-layout.tray](/da/api/css/drawer-layout.tray.md) — Det tilstødende panel i samme flex-række.


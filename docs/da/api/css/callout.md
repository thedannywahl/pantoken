# CSS: callout

`div[class~="instui-callout"]` — Inline informationsadvarsel for en kort påmindelse eller note.

✅ Brug Callout når:

- Du skal fremhæve vigtige oplysninger eller påmindelser inline
- Beskeden er relativt kort (en sætning til et kort afsnit)
- Advarslen skal trække opmærksomhed uden at afbryde hovedflowet
🚫 Brug ikke Callout når:

- Beskeden kræver interaktion eller flere handlinger — brug en Modal eller Alert Dialog
- Indholdet er fokus på siden — brug i stedet et Card eller Hero-layout

## Tilgængelighed

- Sørg for, at alert-rollen er korrekt anvendt (role="alert" eller role="status")
- Brug semantisk farvekontrast, der opfylder WCAG AA-standarder
- Stol ikke alene på farve til at formidle betydning

## Brug

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Slots

| Slot | Beskrivelse |
| --- | --- |
| `message` | Indhold af advarselsmeddelelse |

## Dele

| Del | Beskrivelse |
| --- | --- |
| `.instui-content` | Container for tekstindholdet. |
| `.instui-icon` | Valgfrit ikon til venstre for indholdet. |

## Pseudo-elementer

| Pseudo-element | Beskrivelse |
| --- | --- |
| `::before` | — |

## Tilstande

| Tilstand | Beskrivelse |
| --- | --- |
| `:optional` | — |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-color-info-background` | — | — |
| `--instui-color-info-border` | — | — |
| `--instui-color-info-text` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-size-small` | `<length>` | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## Relateret

- [alert](/da/api/css/alert.md)


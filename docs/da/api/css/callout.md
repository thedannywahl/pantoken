# CSS: callout

`div[class~="instui-callout"]` — Inline informationsadvarsel for en kort påmindelse eller note.

✅ Brug Callout når:

- Du skal fremhæve vigtige oplysninger eller påmindelser inline
- Beskeden er relativt kort (en sætning til et kort afsnit)
- Advarslen skal trække opmærksomhed uden at afbryde hovedflowet
  🚫 Brug ikke Callout når:

- Beskeden kræver interaktion eller flere handlinger — brug en Modal eller Alert Dialog
- Indholdet er fokus på siden — brug i stedet et Card eller Hero-layout

## Accessibility

- Sørg for, at alert-rollen er korrekt anvendt (role="alert" eller role="status")
- Brug semantisk farvekontrast, der opfylder WCAG AA-standarder
- Stol ikke alene på farve til at formidle betydning

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Slots

| Slot      | Description                    |
| --------- | ------------------------------ |
| `message` | Indhold af advarselsmeddelelse |

## Parts

| Part              | Description                              |
| ----------------- | ---------------------------------------- |
| `.instui-content` | Container for tekstindholdet.            |
| `.instui-icon`    | Valgfrit ikon til venstre for indholdet. |

## Pseudo-elements

| Pseudo-element | Description |
| -------------- | ----------- |
| `::before`     | —           |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                            | Type       | Value |
| -------------------------------- | ---------- | ----- |
| `--instui-color-info-background` | —          | —     |
| `--instui-color-info-border`     | —          | —     |
| `--instui-color-info-text`       | —          | —     |
| `--instui-radius-medium`         | —          | —     |
| `--instui-size-small`            | `<length>` | —     |
| `--instui-space-medium`          | —          | —     |
| `--instui-space-small`           | —          | —     |

## Related

- [alert](/da/api/css/alert.md)

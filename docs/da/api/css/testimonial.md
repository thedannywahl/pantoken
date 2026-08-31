# CSS: testimonial

`div[class~="instui-testimonial"]` — Citat- eller vidneudsagn display med tilskrivning og valgfri billeder.

✅ Brug Testimonial når:

- Visning af kunde- eller brugervidneudsagn og citater
- Du vil fremhæve en erklæring med visuelt vægt
- Tilskrivning og kontekst (navn, titel, billede) er vigtig
  🚫 Brug ikke Testimonial når:

- Visning af inline citater i brødtekst — brug et blockquote-element i stedet
- Erklæringen er hovedelementet — brug Hero eller Card i stedet

## Accessibility

- Brug `&lt;blockquote&gt;` semantisk til citatet
- Sikr at tilskrivning er klar og knyttet til citatet
- Hvis du bruger billeder, giv alt-tekst

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                                |
| ----------------- | ------------------------------------------ |
| `.instui-author`  | Tilskrivning forfatternavn.                |
| `.instui-avatar`  | Valgfrit forfatterprofilbillede.           |
| `.instui-content` | Container til citat og tilskrivning.       |
| `.instui-quote`   | Den citerede tekst.                        |
| `.instui-title`   | Valgfri forfatter titel eller tilknytning. |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                           | Type       | Value |
| ------------------------------- | ---------- | ----- |
| `--instui-color-background`     | —          | —     |
| `--instui-color-primary`        | —          | —     |
| `--instui-color-surface`        | —          | —     |
| `--instui-color-text-primary`   | —          | —     |
| `--instui-color-text-secondary` | —          | —     |
| `--instui-font-size-small`      | `<length>` | —     |
| `--instui-font-weight-semibold` | —          | —     |
| `--instui-radius-medium`        | —          | —     |
| `--instui-space-large`          | —          | —     |
| `--instui-space-medium`         | —          | —     |
| `--instui-space-small`          | —          | —     |

## Related

- [card](/da/api/css/card.md)

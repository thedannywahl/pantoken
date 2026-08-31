# CSS: two-column

`div[class~="instui-two-column"]` — To-kolonnelayout med venstre og højre indholdsregioner.

✅ Brug To-Kolonne når:

- Du har to indholdsområder med groft lige stor betydning
- Sammenligner eller kontrasterer to sæt indhold side-by-side
- Bygger et responsivt layout, der stabiliterer på mobil
  🚫 Brug ikke To-Kolonne når:

- En kolonne dominerer siden — brug asymmetrisk layout i stedet
- Indhold drager ikke fordel af side-by-side præsentation

## Accessibility

- Sikre, at begge kolonner er opfattelige og brugbare på smalle viewports
- Brug semantiske vartegn (f.eks. `&lt;section&gt;`) til at omslutter kolonneindhold
- Oprethold tilstrækkelig plads og kontrast mellem kolonner

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                                  |
| ----------------- | -------------------------------------------- |
| `.instui-divider` | Valgfrit visuelt skilletegn mellem kolonner. |
| `.instui-left`    | Venstre kolonne indholdsområde.              |
| `.instui-right`   | Højre kolonne indholdsområde.                |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Conditions

| Type  | Query                | Description |
| ----- | -------------------- | ----------- |
| media | `(max-width: 768px)` | —           |

## Tokens consumed

| Token                   | Type | Value |
| ----------------------- | ---- | ----- |
| `--instui-color-border` | —    | —     |
| `--instui-space-large`  | —    | —     |
| `--instui-space-medium` | —    | —     |

## Related

- [page-layout](/da/api/css/page-layout.md)

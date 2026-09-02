# CSS: two-column

`div[class~="instui-two-column"]` — To-kolonnelayout med venstre og højre indholdsregioner.

✅ Brug To-Kolonne når:

- Du har to indholdsområder med groft lige stor betydning
- Sammenligner eller kontrasterer to sæt indhold side-by-side
- Bygger et responsivt layout, der stabiliterer på mobil
🚫 Brug ikke To-Kolonne når:

- En kolonne dominerer siden — brug asymmetrisk layout i stedet
- Indhold drager ikke fordel af side-by-side præsentation

## Tilgængelighed

- Sikre, at begge kolonner er opfattelige og brugbare på smalle viewports
- Brug semantiske vartegn (f.eks. `&lt;section&gt;`) til at omslutter kolonneindhold
- Oprethold tilstrækkelig plads og kontrast mellem kolonner

## Brug

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Dele

| Del | Beskrivelse |
| --- | --- |
| `.instui-divider` | Valgfrit visuelt skilletegn mellem kolonner. |
| `.instui-left` | Venstre kolonne indholdsområde. |
| `.instui-right` | Højre kolonne indholdsområde. |

## Tilstande

| Tilstand | Beskrivelse |
| --- | --- |
| `:optional` | — |

## Betingelser

| Type | Forespørgsel | Beskrivelse |
| --- | --- | --- |
| media | `(max-width: 768px)` | — |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |

## Relateret

- [page-layout](/da/api/css/page-layout.md)


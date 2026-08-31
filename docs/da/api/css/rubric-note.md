# CSS: rubric-note

`div[class~="instui-rubric-note"]` — Struktureret note med rubrik-kategorier og scoringindikatorer.

✅ Brug Rubric-Note når:

- Visning af karakterrubrik eller vurderingskriterier
- Du skal strukturere indhold efter kategori med score eller indikatorer
- Layoutet skal fremhæve struktur og hierarki
  🚫 Brug ikke Rubric-Note når:

- Visning af simple noter eller kommentarer — brug Callout i stedet
- Kompleks karakterlogik er påkrævet — overvej en brugerdefineret komponent

## Accessibility

- Brug tabel-semantik, hvis du viser en sand rubrik med rækker og kolonner
- Sørg for, at scoreindikatorer ikke kun er farvebaserede
- Giv beskrivende etiketter for hver kategori

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part                  | Description                            |
| --------------------- | -------------------------------------- |
| `.instui-criteria`    | Container til rubrik-kriterie-rækker.  |
| `.instui-description` | Detaljeret beskrivelse af kriterierne. |
| `.instui-header`      | Overskrift med titel og metadata.      |
| `.instui-name`        | Kriterienavn eller kategori.           |
| `.instui-row`         | Individuel kriterie-række.             |
| `.instui-score`       | Scoreindiktor eller badge.             |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                            | Type       | Value |
| -------------------------------- | ---------- | ----- |
| `--instui-color-background`      | —          | —     |
| `--instui-color-border`          | —          | —     |
| `--instui-color-info-background` | —          | —     |
| `--instui-color-info-text`       | —          | —     |
| `--instui-color-primary`         | —          | —     |
| `--instui-color-surface`         | —          | —     |
| `--instui-color-text-secondary`  | —          | —     |
| `--instui-font-size-small`       | `<length>` | —     |
| `--instui-font-weight-semibold`  | —          | —     |
| `--instui-radius-medium`         | —          | —     |
| `--instui-space-medium`          | —          | —     |
| `--instui-space-small`           | —          | —     |

## Related

- [card](/da/api/css/card.md)

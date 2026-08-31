# CSS: testimonial

`div[class~="instui-testimonial"]` — Visualització de cita o testimoni amb atribució i imatges opcionals.

✅ Utilitza Testimonial quan:

- Mostrar testimonis i cites de clients o usuaris
- Vols destacar una declaració amb èmfasi visual
- L'atribució i el context (nom, títol, imatge) són importants
  🚫 No utilitzis Testimonial quan:

- Mostrar cites en línia en el text del cos — utilitza un element blockquote
- La declaració és el focus principal — utilitza Hero o Card

## Accessibility

- Utilitza `&lt;blockquote&gt;` semànticament per a la cita
- Assegura't que l'atribució sigui clara i associada amb la cita
- Si utilitzes imatges, proporciona text alternatiu

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                         |
| ----------------- | ----------------------------------- |
| `.instui-author`  | Nom de l'autor de l'atribució.      |
| `.instui-avatar`  | Imatge de perfil d'autor opcional.  |
| `.instui-content` | Contenidor per a cita i atribució.  |
| `.instui-quote`   | El text citat.                      |
| `.instui-title`   | Títol o afiliació d'autor opcional. |

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

- [card](/ca/api/css/card.md)

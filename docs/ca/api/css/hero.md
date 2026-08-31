# CSS: hero

`div[class~="instui-hero"]` — Secció de capçalera d'amplada completa amb títol, subtítol i imatge de fons opcional.

✅ Utilitza Hero quan:

- Necessites una capçalera de pàgina destacada amb jerarquia visual
- La pàgina es beneficia d'una secció d'obertura gran i cridanera
- Vols incloure imatges de fons o accents de gradient
  🚫 No useu Hero quan:

- Construint una capçalera de pàgina simple — utilitza Page-Layout al seu lloc
- El Hero compita amb contingut crític — prioritza la legibilitat

## Accessibility

- Assegura't que el títol estigui en una etiqueta `&lt;h1&gt;` per a l'estructura semàntica
- Si utilitzes imatges de fons, proporciona suficient contrast de color per al text
- Evita l'autoreproduccció en vídeo o animació que podria desviar l'atenció del contingut

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Slots

| Slot       | Description                 |
| ---------- | --------------------------- |
| `subtitle` | Contingut del subtítol Hero |
| `title`    | Contingut del títol Hero    |

## Parts

| Part                 | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `.instui-actions`    | Botons d'acció o enllaços opcionals.                            |
| `.instui-background` | Capa de fons opcional (imatge o gradient).                      |
| `.instui-content`    | Contenidor per al text Hero i les accions.                      |
| `.instui-overlay`    | Superposició semitransparent opcional per al contrast del text. |
| `.instui-subtitle`   | Text de suport o descripció opcional.                           |
| `.instui-title`      | Títol Hero principal (normalment `&lt;h1&gt;`).                 |

## Pseudo-elements

| Pseudo-element | Description |
| -------------- | ----------- |
| `::before`     | —           |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                               | Type       | Value |
| ----------------------------------- | ---------- | ----- |
| `--instui-color-primary-background` | —          | —     |
| `--instui-font-size-hero`           | `<length>` | —     |
| `--instui-font-size-large`          | `<length>` | —     |
| `--instui-font-weight-bold`         | —          | —     |
| `--instui-space-large`              | —          | —     |
| `--instui-space-medium`             | —          | —     |

## Related

- [card](/ca/api/css/card.md)

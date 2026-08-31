# CSS: two-column

`div[class~="instui-two-column"]` — Disseny de dues columnes amb regions de contingut esquerre i dreta.

✅ Utilitzeu dues columnes quan:

- Teniu dues àrees de contingut d'importància aproximadament igual
- Comparant o contrastant dos conjunts de contingut col·lats
- Creant un disseny responsiu que s'apila en dispositius mòbils
  🚫 No utilitzeu dues columnes quan:

- Una columna domina la pàgina — utilitzeu un disseny asimètric en lloc d'això
- El contingut no es beneficia de la presentació col·lada

## Accessibility

- Assegureu-vos que ambdues columnes es perceben i es poden utilitzar en finestres estretes
- Utilitzeu punts de referència semàntics (p. ex., `&lt;section&gt;`) per envoltar el contingut de la columna
- Mantingueu suficient espai i contrast entre les columnes

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                               |
| ----------------- | ----------------------------------------- |
| `.instui-divider` | Divisor visual opcional entre columnes.   |
| `.instui-left`    | Àrea de contingut de la columna esquerra. |
| `.instui-right`   | Àrea de contingut de la columna dreta.    |

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

- [page-layout](/ca/api/css/page-layout.md)

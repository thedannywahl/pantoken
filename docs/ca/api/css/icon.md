# CSS: icon

`.instui-icon` — El sistema d'icones: dimensionament `.instui-icon` més el pintor compartit `-icon-&lt;name&gt;` que emmascara un glif (en `currentColor`) abans de qualsevol element.

**Font:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## Accessibility

El glif és decoratiu, així que marca'l `aria-hidden="true"`; dona'li un `role` o etiqueta només quan la icona transmet significat per si sola.

## Usage

```css
@import "@pantoken/components/components.css";
```

## Examples

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## Modifiers

| Modifier   | Description                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| `.-icon-*` | Estableix el token del glif (`--pantoken-glyph`) i renderitza'l a través del pintor compartit (per exemple `-icon-search`). |

## Pseudo-elements

| Pseudo-element | Description                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `::before`     | El glif mateix: una caixa d'1em emmascara des de `--pantoken-glyph` i plena de `currentColor`. |

## Tokens consumed

| Token              | Type    | Value |
| ------------------ | ------- | ----- |
| `--pantoken-glyph` | `<url>` | —     |
